const userModal = require("../modals/userModal");
const bcryptjs = require('bcryptjs');

const signup = async(req,res) =>{
  
  const formData = req.body;

  const userData = new userModal({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    identity: formData.identity,
    password: formData.password,
  });
  
  console.log(userData);
  try {
    const ExsistingUser = await userModal.findOne({email : userData.email});

    if(ExsistingUser){
      return res.status(400).json({message : "user already exsist"})
    }
    const hashPassword = await bcryptjs.hash(userData.password,10);

    userData.password = hashPassword;
    
    await userData.save();

    res.status(200).json({message : 'User created successfully!', name : userData.name});
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message : 'An error occurred while creating the user.'});
  }
}

const login = async(req,res) =>{

  const userData = req.body;
  console.log(userData);
  try{
    const exsistingUser = await userModal.findOne({email : userData.email});
    if(!exsistingUser){
      return res.status(404).json({message : "user not found"});
    }

    const matchPassword = await bcryptjs.compare(userData.password,exsistingUser.password);

    if(!matchPassword){
      return res.status(400).json({message : "Given Password is Wrong"});
    }

    return res.status(200).json({name : exsistingUser.name, email : exsistingUser.email })
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message : 'Login Failed'});
  }
}
module.exports = {
  signup,
  login
}
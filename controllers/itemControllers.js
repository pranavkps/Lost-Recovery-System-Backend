const itemModal = require("../modals/itemModal");
const userModal = require("../modals/userModal");
const { v4: uuidv4 } = require('uuid');

const saveItem = async (req,res)=>{

  const { place, email, itemName } = req.body;
  const imagePath = req.file.path;

  const ExsistingUser = await userModal.findOne({email : email});

  if(!ExsistingUser){
    return res.status(400).json({message : "not authenticated user please login & submit Your response"})
  }

  const image = new itemModal({
    id: uuidv4(),
    place: place,
    email: email,
    itemName : itemName,
    phone: ExsistingUser.phone,
    name: ExsistingUser.name,
    identity: ExsistingUser.identity,
    imagePath: imagePath,
  });

  try {
    const savedImage = await image.save();
    res.status(201).json(savedImage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }

}

const getItems = async (req, res) => {
  try {
    const images = await itemModal.find();

    if (!images) {
      return res.status(404).json({ error: 'No images found' });
    }
    
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const updateItem = async(req,res) =>{
  try{
    
    const { name , id} = req.body;

    const item = await itemModal.findOne({id : id});

    if(!item)
      return res.status(400).json({message : "no such item exsist"})
    
    item.status = 'approved';
    item.issued_to = name;
    item.updated_at = new Date();

    await item.save();

    res.status(200).json({message : 'item updated successfully!'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({error : "Internal Server error"});
  }
};

const getuser = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await userModal.findOne({email : email});

    if (!user) {
      return res.status(404).json({ error: 'no user found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const getItemsByUser = async (req, res) => {
  try {
    const email = req.query.email;
    const images = await itemModal.find({email : email});

    if (!images) {
      return res.status(404).json({ error: 'no user found' });
    }
    
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  saveItem,
  getItems,
  updateItem,
  getuser,
  getItemsByUser,
}
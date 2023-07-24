const {Router} = require('express');
const { signup , login } = require('../controllers/authControllers');
const { saveItem, getItems, updateItem, getuser, getItemsByUser } = require('../controllers/itemControllers');
const itemModal = require("../modals/itemModal");
const multer = require('multer');

//define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/signup",signup);

router.post("/login",login);

router.post('/upload-item', upload.single('image'), saveItem);

router.get('/get-items', getItems);

router.patch('/update-item',updateItem);

router.get('/getuser',getuser);

router.get('/get-items-by-user',getItemsByUser);

router.get("/",(req,res)=>{
  return res.status(200).json({message : "welcome to backend"});
});


router.get('/search/:tags', async (req, res) => {

  const searchTerm = new RegExp(req.params?.tags,'i');
  
  if(searchTerm!==''){
    try{
      const searchResults = await itemModal.find({ itemName : searchTerm});
      if(searchResults.length === 0){
        res.status(404).json({message :"No Image found"})
      }
      else res.send(searchResults);

      console.log(searchResults);
    }
    catch(error){
      console.log(error);
      res.status(404).json({message :"No Item found" })
    }
  }
  else{
    try {
      const images = await itemModal.find();
  
      if (!images) {
        return res.status(404).json({ error: 'No item found' });
      }
      
      res.json(images);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
});


module.exports = router;
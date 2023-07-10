const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/mini_project')
.then(()=>{
  app.listen(5000, () => {
    console.log("Server listening on port 5050");
  });
})
.catch((error)=>{
  console.error("Error connecting to MongoDB:", error);
});

const app = express();
app.use(cors());
app.use(express.json());

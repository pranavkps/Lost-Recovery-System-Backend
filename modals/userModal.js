const mongoose = require('mongoose');

const userModal = new mongoose.Schema(
  {
    name : {
      type : String,
      required : true 
    },
    identity :{
      type : String,
      required : true
    },
    email :{
      type : String,
      required : true,
      unique : true,
      trim : true,
      lowercase : true
    },
    phone :{
      type : Number,
      required : true,
      length : 10,
    },
    password :{
      type : String,
      required : true
    },  
  },
  { timestamps: true }
)

module.exports = mongoose.model("userModal", userModal);
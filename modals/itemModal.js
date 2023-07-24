const mongoose = require('mongoose');

const itemModal = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    imagePath : {
      type : String,
      required : true 
    },
    itemName :{
      type : String,
      required : true
    },
    place :{
      type : String,
      required : true
    },
    email :{
      type : String,
      required : true
    },
    phone :{
      type : Number,
      required : true,
      length : 10,
    },
    name : {
      type : String,
      required : true 
    },
    identity :{
      type : String,
      required : true
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    },
    issued_to:{
      type: String,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('itemModal',itemModal);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userlocalisation = new Schema(
  { 
    loaded:Boolean,
    crd:{
       lat:String,
       long:String,
      
    },
    code:String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("localisation", Userlocalisation);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfile = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    avatar: {
      type: String,
      required:true,
      default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
  },

 
   
    adress_actuel: "string",
    matricule_voiture: "string",
    type_voiture: "string",
    poids: "string",
    likes:[
     {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      }
     }
   ]
    
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profiles", UserProfile);

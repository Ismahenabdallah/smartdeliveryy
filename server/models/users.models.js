const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

require('dotenv').config()
const UserModel = new Schema(
  {
    fullname: String,

    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: String,
    role:
    {
      type: String,
      required: true
    },
    status: {
      type: String, 
      enum: ['Desactive', 'Active'],
      default: 'Desactive'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
     
      isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },

},
  {
    timestamps: true,
  }
);
UserModel.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("users", UserModel);

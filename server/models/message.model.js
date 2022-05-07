const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
   
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "counsellors",
      required: true,
    },
    parentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parents",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("parentcouncilorchats", messageSchema);

module.exports = Message;

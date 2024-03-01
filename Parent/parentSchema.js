const mongoose = require("mongoose");

const parentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
    childName: {
      type: String,
    },
    childDob: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("parents", parentSchema);

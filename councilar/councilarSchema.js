const mongoose = require("mongoose");

const councilarSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required:true
    },
    isAdminApproved: {
      type: Boolean,
      default: false,
    },
    experienceYear: {
      type: String,
      default: "0",
    },
    certificateImg: {
      type: Object,
      default: null,
    },
    profilePicture: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CouncilarModel = mongoose.model("counsellors", councilarSchema);
module.exports = CouncilarModel;

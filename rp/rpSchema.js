const mongoose = require("mongoose");

const rpSchema = mongoose.Schema(
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
      default: "",
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

const RpModel = mongoose.model("rp", rpSchema);
module.exports = RpModel;

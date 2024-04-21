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
      required: true,
    },
    isAdminApproved: {
      type: String,
      default: "pending",
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
    status: {
      type: String,
      enum: ["active", "banned", "temp-ban"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const CouncilarModel = mongoose.model("counsellors", councilarSchema);
module.exports = CouncilarModel;

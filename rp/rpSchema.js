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
      type: String,
      default: "pending",
    },
    experienceYear: {
      type: String,
      default: "0",
    },
    qualification: {
      type: String
    },
    certificateImg: {
      type: Object,
      default: null,
    },
    profilePicture: {
      type: Object,
      default: null,
    },
    rating:{
      type:Number,
      default:0
    }
  },
  {
    timestamps: true,
  }
  
);

const RpModel = mongoose.model("rp", rpSchema);
module.exports = RpModel;

const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    para1: {
      type: String,
      required: true,
    },
    para2: {
      type: String,
    },

    date: Date,
    title: {
      type: String,
      required: true,
    },
    rpid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "rp",
    },
    img: {
      type: Object,
    },
    reviews: Array,
  },
  { timestamps: true }
);
module.exports = new mongoose.model("blogs", blogSchema);

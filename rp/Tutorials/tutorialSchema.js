const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  video: {
    type: Object,
  },
  thumbnail: {
    type: Object,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rpid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rp",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  target: {
    type: String,
  },
  duration: {
    type: String
  },
});

const VideoTutorial = mongoose.model("tutorials", tutorialSchema);

module.exports = VideoTutorial;

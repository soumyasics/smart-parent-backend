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
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "counsellors",
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
  freedemo:{
    type:Boolean,
    default:false
  }
});

const VideoTutorial = mongoose.model("consellortutorials", tutorialSchema);

module.exports = VideoTutorial;

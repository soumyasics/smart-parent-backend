const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  video:{
    type:Object
  },
  thumbnail:{
    type:Object
  },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rp',
        required: true
    },
    title: {
      type: String,
      required: true
  },
        description: {
          type: String,
          required: true
      },
      target: {
        type: String,
        required: true
    },
      duration: {
        type: String,
        required: true
    },
});

const VideoTutorial = mongoose.model('tutorials', tutorialSchema);

module.exports = VideoTutorial;

const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    thumbnail: {
        type: Object,
        required: true
    },
    videoURL: {
        type: Object,
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
    rpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rp',
        required: true
    }
});

const VideoTutorial = mongoose.model('tutorials', tutorialSchema);

module.exports = VideoTutorial;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answer = new Schema({
    rpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rp",
        required: true,
    },
    taskid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taskqns",
        required: true,
    },
    parentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "parents",
        required: true,
    },
    ans1: {
        type: String,
        required: true
    },
    ans2: {
        type: String,
        required: true
    },
    ans3: {
        type: String,
        required: true
    },
    ans4: {
        type: String,
        required: true
    },
    ans5: {
        type: String,
        required: true
    },
    score1: {
        type: Number,
        required: true
    },
    score2: {
        type: Number,
        required: true
    },
    score3: {
        type: Number,
        required: true
    }, score4: {
        type: Number,
        required: true
    },
    score5: {
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    comments:{
        type: String,
        required: true
    },
    suggestion:{
        type: Number,
        default: 0
    }

});
const ansewrs = mongoose.model("answers", answer);

module.exports = ansewrs;
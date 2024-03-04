const mongoose = require("mongoose")
const blogSchema = mongoose.Schema({
    para1: {
        type: String,
        required: true
    },
    parar2: {
        type: String
    },
   
    date: Date,
    title: {
        type: String,
        required: true
    },
    rpid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'rp'
    }, img: {
        type: Array
    },reviews:Array

})
module.exports = new mongoose.model("blogs", blogSchema)
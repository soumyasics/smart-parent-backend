
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    rpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rp',
        required: true
    },
    parentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parents',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sender:{
        type:String,
        required:true
    }
});

const Message = mongoose.model('parentrpchats', messageSchema);

module.exports = Message;

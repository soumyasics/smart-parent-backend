const mongoose = require('mongoose');
const bannedRpSchema = new mongoose.Schema({
    rpId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rp",
        required: true,
    }, 
    bannedComplaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rpcomplaints",
        required: true,
    }, 
    currentStatus: {
        type: String,
        default: "banned",
    }
})
const BannedRpModel = mongoose.model('bannedrp', bannedRpSchema);
module.exports = BannedRpModel;
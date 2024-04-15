const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema(
    {
        for: {
            type: String,
            required: true
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "parents",
        },
        rpId: {
            type: Schema.Types.ObjectId,
            ref: "rp",
        },
        cId: {
            type: Schema.Types.ObjectId,
            ref: "counsellors",
        },
        complaint: {
            type: String
        },
        actionTaken: {
            type: String,
            default: 'pending'
        }
    })
const complaint = mongoose.model("complaints", complaintSchema);
module.exports = complaint;
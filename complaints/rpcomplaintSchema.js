const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema({
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "parents",
    required: true,
  },
  rpId: {
    type: Schema.Types.ObjectId,
    ref: "rp",
    required: true,
  },

  complaint: {
    type: String,
    required: true,
  },
  actionTaken: {
    type: String,
    default: "pending",
  },
});
const complaint = mongoose.model("rpcomplaints", complaintSchema);
module.exports = complaint;

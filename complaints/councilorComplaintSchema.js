const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema({
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "parents",
    required: true,
  },
  cId: {
    type: Schema.Types.ObjectId,
    ref: "counsellors",
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
const complaint = mongoose.model("concillorcomplaints", complaintSchema);
module.exports = complaint;

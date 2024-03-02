const mongoose = require("mongoose");

const subscribeSchema = mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parents",
    required: true,
  },
  resourcePersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rp",
    required: true,
  },
  acHolderName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  cvv: {
    type: String,
  },
  amount: {
    type: String,
  },
});

const SchemaModel = mongoose.model("subscription", subscribeSchema);
module.exports = SchemaModel;
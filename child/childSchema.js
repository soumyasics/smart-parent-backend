const mongoose = require("mongoose");

const childSchema = mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  childAge: {
    type: String,
  },
  childHobbies: {
    type: String,
  },
  childGender: {
    type: String,
  },
  childHeight: {
    type: String,
  },
  childWeight: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parents",
  },
});
module.exports = mongoose.model("children", childSchema);

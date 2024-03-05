const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  rpid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rp",
    required: true,
  },
  qn1: {
    type: String,
    required: true,
  },
  op1_1: {
    type: String,
    required: true,
  },
  op1_2: {
    type: String,
    required: true,
  },
  op1_3: {
    type: String,
    required: true,
  },
  op1_4: {
    type: String,
    required: true,
  },
  ans1: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },

  qn2: {
    type: String,
    required: true,
  },
  op2_1: {
    type: String,
    required: true,
  },
  op2_2: {
    type: String,
    required: true,
  },
  op2_3: {
    type: String,
    required: true,
  },
  op2_4: {
    type: String,
    required: true,
  },
  ans2: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },

  qn3: {
    type: String,
    required: true,
  },
  op3_1: {
    type: String,
    required: true,
  },
  op3_2: {
    type: String,
    required: true,
  },
  op3_3: {
    type: String,
    required: true,
  },
  op3_4: {
    type: String,
    required: true,
  },
  ans3: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },

  qn4: {
    type: String,
    required: true,
  },
  op4_1: {
    type: String,
    required: true,
  },
  op4_2: {
    type: String,
    required: true,
  },
  op4_3: {
    type: String,
    required: true,
  },
  op4_4: {
    type: String,
    required: true,
  },
  ans4: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },

  qn5: {
    type: String,
    required: true,
  },
  op5_1: {
    type: String,
    required: true,
  },
  op5_2: {
    type: String,
    required: true,
  },
  op5_3: {
    type: String,
    required: true,
  },
  op5_4: {
    type: String,
    required: true,
  },
  ans5: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },
});
const TaskModel = mongoose.model("taskqns", TaskSchema);

module.exports = TaskModel;

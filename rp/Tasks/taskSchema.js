const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    rpid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rp',
        required: true
    },
    qn1: {
        type: String,
        required: true
    },
    op1_1: {
        type: String,
        required: true
    },
    op1_2: {
        type: String,
        required: true
    },
    op1_3: {
        type: String,
        required: true
    },
    op1_4: {
        type: String,
        required: true
    },
    ans1: {
        type: String,
        enum: ['op1_1', 'op1_2', 'op1_3', 'op1_4'],
        required: true
    },

    qn2: {
        type: String,
        required: true
    },
    op2_1: {
        type: String,
        required: true
    },
    op2_2: {
        type: String,
        required: true
    },
    op2_3: {
        type: String,
        required: true
    },
    op2_4: {
        type: String,
        required: true
    },
    ans2: {
        type: String,
        enum: ['op2_1', 'op2_2', 'op2_3', 'op2_4'],
        required: true
    },

    qn3: {
        type: String,
        required: true
    },
    op3_1: {
        type: String,
        required: true
    },
    op3_2: {
        type: String,
        required: true
    },
    op3_3: {
        type: String,
        required: true
    },
    op3_4: {
        type: String,
        required: true
    },
    ans3: {
        type: String,
        enum: ['op3_1', 'op3_2', 'op3_3', 'op3_4'],
        required: true
    },

    qn4: {
        type: String,
        required: true
    },
    op4_1: {
        type: String,
        required: true
    },
    op4_2: {
        type: String,
        required: true
    },
    op4_3: {
        type: String,
        required: true
    },
    op4_4: {
        type: String,
        required: true
    },
    ans4: {
        type: String,
        enum: ['op4_1', 'op4_2', 'op4_3', 'op4_4'],
        required: true
    },

    qn5: {
        type: String,
        required: true
    },
    op5_1: {
        type: String,
        required: true
    },
    op5_2: {
        type: String,
        required: true
    },
    op5_3: {
        type: String,
        required: true
    },
    op5_4: {
        type: String,
        required: true
    },
    ans5: {
        type: String,
        enum: ['op5_1', 'op5_2', 'op5_3', 'op5_4'],
        required: true
    },

    qn6: {
        type: String,
        required: true
    },
    op6_1: {
        type: String,
        required: true
    },
    op6_2: {
        type: String,
        required: true
    },
    op6_3: {
        type: String,
        required: true
    },
    op6_4: {
        type: String,
        required: true
    },
    ans6: {
        type: String,
        enum: ['op6_1', 'op6_2', 'op6_3', 'op6_4'],
        required: true
    },

    qn7: {
        type: String,
        required: true
    },
    op7_1: {
        type: String,
        required: true
    },
    op7_2: {
        type: String,
        required: true
    },
    op7_3: {
        type: String,
        required: true
    },
    op7_4: {
        type: String,
        required: true
    },
    ans7: {
        type: String,
        enum: ['op7_1', 'op7_2', 'op7_3', 'op7_4'],
        required: true
    },

    qn8: {
        type: String,
        required: true
    },
    op8_1: {
        type: String,
        required: true
    },
    op8_2: {
        type: String,
        required: true
    },
    op8_3: {
        type: String,
        required: true
    },
    op8_4: {
        type: String,
        required: true
    },
    ans8: {
        type: String,
        enum: ['op8_1', 'op8_2', 'op8_3', 'op8_4'],
        required: true
    },

    qn9: {
        type: String,
        required: true
    },
    op9_1: {
        type: String,
        required: true
    },
    op9_2: {
        type: String,
        required: true
    },
    op9_3: {
        type: String,
        required: true
    },
    op9_4: {
        type: String,
        required: true
    },
    ans9: {
        type: String,
        enum: ['op9_1', 'op9_2', 'op9_3', 'op9_4'],
        required: true
    },

    qn10: {
        type: String,
        required: true
    },
    op10_1: {
        type: String,
        required: true
    },
    op10_2: {
        type: String,
        required: true
    },
    op10_3: {
        type: String,
        required: true
    },
    op10_4: {
        type: String,
        required: true
    },
    ans10: {
        type: String,
        enum: ['op9_1', 'op9_2', 'op9_3', 'op9_4'],
        required: true
    }
})
const tasks = mongoose.model('taskqns', TaskSchema);

module.exports = tasks;
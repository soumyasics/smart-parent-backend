const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    rpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rp",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    qn1: {
        type: String,
        required: true,
    },
    op1_1: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }
    }
    ,
    op1_2: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }

    },
    op1_3: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }
    },
    op1_4: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }
    },

    qn2: {
        type: String,
        required: true,
    },
    op2_1: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }

    },
    op2_2: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }


    },
    op2_3: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }
    },
    op2_4: {
        op: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
        }
    },

    qn3: {
        type: String,
        required: true,
    },
    op3_1: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op3_2: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op3_3: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op3_4: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    
    qn4: {
        type: String,
        required: true,
    },
    op4_1: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op4_2: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op4_3: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op4_4: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    
    qn5: {
        type: String,
        required: true,
    },
    op5_1: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op5_2: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op5_3: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    },
    op5_4: {
        op: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        }
    }
    
});
const TaskModel = mongoose.model("taskqns", TaskSchema);

module.exports = TaskModel;

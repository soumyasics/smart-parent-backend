const ansewrmodel = require("./taskAnswers");
const TaskModel = require("./taskSchema");

const addQuestions = (req, res) => {
  const {
    rpid,
    title,
    description,
    target,
    duration,
    qn1,
    op1_1,
    score1_1,
    op1_2,
    score1_2,
    op1_3,
    score1_3,
    op1_4,
    score1_4,
    qn2,
    op2_1,
    score2_1,
    op2_2,
    score2_2,
    op2_3,
    score2_3,
    op2_4,
    score2_4,
    qn3,
    op3_1,
    score3_1,
    op3_2,
    score3_2,
    op3_3,
    score3_3,
    op3_4,
    score3_4,
    qn4,
    op4_1,
    score4_1,
    op4_2,
    score4_2,
    op4_3,
    score4_3,
    op4_4,
    score4_4,
    qn5,
    op5_1,
    score5_1,
    op5_2,
    score5_2,
    op5_3,
    score5_3,
    op5_4,
    score5_4,
  } = req.body;

  if (!rpid) {
    return res.status(422).json({ message: "Resource Person Id is required." });
  }

  const newTask = new TaskModel({
    rpid,
    title,
    description,
    target,
    duration,
    qn1,
    op1_1,
    score1_1,
    op1_2,
    score1_2,
    op1_3,
    score1_3,
    op1_4,
    score1_4,
    qn2,
    op2_1,
    score2_1,
    op2_2,
    score2_2,
    op2_3,
    score2_3,
    op2_4,
    score2_4,
    qn3,
    op3_1,
    score3_1,
    op3_2,
    score3_2,
    op3_3,
    score3_3,
    op3_4,
    score3_4,
    qn4,
    op4_1,
    score4_1,
    op4_2,
    score4_2,
    op4_3,
    score4_3,
    op4_4,
    score4_4,
    qn5,
    op5_1,
    score5_1,
    op5_2,
    score5_2,
    op5_3,
    score5_3,
    op5_4,
    score5_4,
  });

  newTask
    .save()
    .then((task) => {
      res.status(200).json({ data: task, message: "Task Added Successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to add questions." });
    });
};

const viewAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    return res.status(200).json({ message: "tasks", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error fetching tasks", error });
  }
};

const viewTaskQnById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const tasks = await TaskModel.findById(id);
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    return res.status(200).json({ message: "tasks", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error fetching tasks", error });
  }
};

const viewTaskQnByRPId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const tasks = await TaskModel.find({ rpid: id });
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    return res.status(200).json({ message: "tasks", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error fetching tasks", error });
  }
};
// Delete an existing task
const deleteTaskById = (req, res) => {
  const id = req.params.id;

  TaskModel.findByIdAndDelete(id)
    .then((deletedVideoTutorial) => {
      if (!deletedVideoTutorial) {
        return res.json({ status: 401, message: "Task not found." });
      }
      res.json({ status: 200, message: "Task  deleted successfully." });
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: 500, message: "Failed to delete Task." });
    });
};

const checkanswer1 = (ans, answers) => {
  switch (ans) {
    case answers.op1_1:
      return answers.score1_1;

    case answers.op1_2:
      return answers.score1_2;

    case answers.op1_3:
      return answers.score1_3;

    default:
      return answers.score1_4;
  }
};
const checkanswer2 = (ans, answers) => {
  
  switch (ans) {
    case answers.op2_1:
      return answers.score2_1;

    case answers.op2_2:
      return answers.score2_2;

    case answers.op2_3:
      return answers.score2_3;

    default:
      return answers.score2_4;
  }
};
const checkanswer3 = (ans, answers) => {
  switch (ans) {
    case answers.op3_1:
      return answers.score3_1;

    case answers.op3_2:
      return answers.score3_2;

    case answers.op3_3:
      return answers.score3_3;

    default:
      return answers.score3_4;
  }
};
const checkanswer4 = (ans, answers) => {
  switch (ans) {
    case answers.op4_1:
      return answers.score4_1;

    case answers.op4_2:
      return answers.score3_2;

    case answers.op4_3:
      return answers.score3_3;

    default:
      return answers.score3_4;
  }
};

const checkanswer5 = (ans, answers) => {
  switch (ans) {
    case answers.op5_1:
      return answers.score5_1;
    case answers.op5_2:
      return answers.score5_2;
    case answers.op5_3:
      return answers.score5_3;
    default:
      return answers.score5_4;
  }
};

const getIds = async (taskid) => {
  let rpid = null;
};

const addAnswers = async (req, res) => {
  try {
    let id = req.params?.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    let rpid = null;
    let comments = "";
    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    let score4 = 0;
    let score5 = 0;
    let total = 0;
    let suggestion = 0;
    let task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    rpid = task.rpid;

    let ans1 = req.body.ans1;
    let ans2 = req.body.ans2;
    let ans3 = req.body.ans3;
    let ans4 = req.body.ans4;
    let ans5 = req.body.ans5;

    score1 = checkanswer1(ans1, task);
    score2 = checkanswer2(ans2, task);
    score3 = checkanswer3(ans3, task);
    score4 = checkanswer4(ans4, task);
    score5 = checkanswer5(ans5, task);
    total = score1 + score2 + score3 + score4 + score5;

    if (total < 8) {
      comments = "you better get a councilor advice";
      suggestion = 0;
    } else if (total > 8 && total < 15) {
      comments = "Your kid is Okay !!! But need to get more active";
      suggestion = 1;
    } else {
      comments = "Your kid is Perfect !!!";
      suggestion = 2;
    }
    const answers = await new ansewrmodel({
      parentid: req.body?.parentid,
      taskid: req.params?.id,
      rpid: rpid,
      ans1: req.body?.ans1,
      ans2: req.body?.ans2,
      ans3: req.body?.ans3,
      ans4: req.body?.ans4,
      ans5: req.body?.ans5,
      score1: score1,
      score2: score2,
      score3: score3,
      score4: score4,
      score5: score5,
      total: total,
      comments: comments,
      suggestion: suggestion,
    });
    await answers.save();

    return res.status(200).json({
      message: "Answers added successfully",
      data: answers,
    });
  } catch (error) {
    console.log("error on add answers", error);
    return res
      .status(500)
      .json({ message: "server error on add answers", error });
  }
};

const getAllAnswers= async (req,res)=>{
  console.log( req.params.id)
  const data = await ansewrmodel.find({ parentid: req.params.id }); 
  console.log(data)
  res.send({
    data:data
  })
}

module.exports = {
  addQuestions,
  deleteTaskById,
  viewTaskQnById,
  viewTaskQnByRPId,
  viewAllTasks,
  addAnswers,
  getAllAnswers
};

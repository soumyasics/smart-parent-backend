const taskSchema = require('./taskSchema');


const addQuestions = (req, res) => {


  const {
    rpid,
    title,
    description,
    target,
    duration,
    qn1,
    op1_1,
    op1_2,
    op1_3,
    op1_4,
    ans1,
    qn2,
    op2_1,
    op2_2,
    op2_3,
    op2_4,
    ans2,
    qn3,
    op3_1,
    op3_2,
    op3_3,
    op3_4,
    ans3,
    qn4,
    op4_1,
    op4_2,
    op4_3,
    op4_4,
    ans4,
    qn5,
    op5_1,
    op5_2,
    op5_3,
    op5_4,
    ans5,
    qn6,
    op6_1,
    op6_2,
    op6_3,
    op6_4,
    ans6,
    qn7,
    op7_1,
    op7_2,
    op7_3,
    op7_4,
    ans7,
    qn8,
    op8_1,
    op8_2,
    op8_3,
    op8_4,
    ans8,
    qn9,
    op9_1,
    op9_2,
    op9_3,
    op9_4,
    ans9,
    qn10,
    op10_1,
    op10_2,
    op10_3,
    op10_4,
    ans10
  } = req.body;

  const newTask = new Task({
    rpid,
    title,
        description,
      target,
      duration,
    qn1,
    op1_1,
    op1_2,
    op1_3,
    op1_4,
    ans1,
    qn2,
    op2_1,
    op2_2,
    op2_3,
    op2_4,
    ans2,
    qn3,
    op3_1,
    op3_2,
    op3_3,
    op3_4,
    ans3,
    qn4,
    op4_1,
    op4_2,
    op4_3,
    op4_4,
    ans4,
    qn5,
    op5_1,
    op5_2,
    op5_3,
    op5_4,
    ans5,
    qn6,
    op6_1,
    op6_2,
    op6_3,
    op6_4,
    ans6,
    qn7,
    op7_1,
    op7_2,
    op7_3,
    op7_4,
    ans7,
    qn8,
    op8_1,
    op8_2,
    op8_3,
    op8_4,
    ans8,
    qn9,
    op9_1,
    op9_2,
    op9_3,
    op9_4,
    ans9,
    qn10,
    op10_1,
    op10_2,
    op10_3,
    op10_4,
    ans10
  });

  newTask.save()
    .then(task => {
      res.status(200).json(task);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to add questions.' });
    });
};


const viewTaskQnById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const tasks = await taskSchema.findById(id);
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    return res.status(200).json({ message: "tasks", data: tasks });
  } catch (error) {
    return res.status(500).json({ message: "server error fetching tasks", error });
  }
};

const viewTaskQnByRPId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const tasks = await taskSchema.find({ rpid: id });
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    return res.status(200).json({ message: "tasks", data: tasks });
  } catch (error) {
    return res.status(500).json({ message: "server error fetching tasks", error });
  }
};
// Delete an existing task
const deleteTaskById = (req, res) => {
  const id = req.params.id;

  taskSchema.findByIdAndDelete(id)
    .then(deletedVideoTutorial => {
      if (!deletedVideoTutorial) {
        return res.json({ status: 401, message: 'Task not found.' });
      }
      res.json({ status: 200, message: 'Task  deleted successfully.' });
    })
    .catch(error => {
      console.error(error);
      res.json({ status: 500, message: 'Failed to delete Task.' });
    });
};



module.exports = {
  addQuestions,
  deleteTaskById,
  viewTaskQnById,
  viewTaskQnByRPId
};
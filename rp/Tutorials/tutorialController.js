const tutorialSchema = require("./tutorialSchema");
const multer = require("multer");

// Soumya

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload"); // Ensure that 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Ensure unique filenames
  },
});

const upload = multer({ storage: storage }).array("files", 2);

const addTutorial = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const { title, description, rpid, duration, target } = req.body;
    const newVideoTutorial = await new tutorialSchema({
      title,
      description,
      duration,
      target,
      thumbnail: req.files[0],
      video: req.files[1],
      rpid,
    });

    await newVideoTutorial.save();
    res.status(200).json({
      message: "Video tutorial added successfully",
      videoTutorial: newVideoTutorial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add video tutorial.", error });
  }
};

const getAllTutorials = async (req, res) => {
  try {
    const videoTutorials = await tutorialSchema.find().populate("rpid").exec();
    return res.status(200).json({
      data: videoTutorials,
      message: "All Video Tutorials",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add video tutorial.", error });
  }
};
const getTutorialById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const videoTutorial = await tutorialSchema
      .findById(id)
      .populate("rpid")
      .exec();
    if (!videoTutorial) {
      return res.status(404).json({ message: "Video tutorial not found" });
    }
    return res.status(200).json({
      data: videoTutorial,
      message: "Video Tutorial",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get  video  tutorial by id.", error });
  }
};
const getTutorialsByRpId = async () => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const videoTutorials = await tutorialSchema
      .find({
        rpid: id,
      })
      .populate("rpid")
      .exec();
    return res.status(200).json({
      data: videoTutorials,
      message: "All Video Tutorials",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add video tutorial.", error });
  }
};
// Edit an existing video tutorial
const editVideoTutorial = (req, res) => {
  tutorialSchema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        thumbnail: req.files[0],
        video: req.files[1],
        title: req.body.title,
        description: req.body.description,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

// Delete an existing video tutorial
const deleteVideoTutorial = (req, res) => {
  const { id } = req.params;

  tutorialSchema
    .findByIdAndDelete(id)
    .then((deletedVideoTutorial) => {
      if (!deletedVideoTutorial) {
        return res.json({ status: 401, message: "Video tutorial not found." });
      }
      res.json({
        status: 200,
        message: "Video tutorial deleted successfully.",
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: 500, message: "Failed to delete video tutorial." });
    });
};

module.exports = {
  addTutorial,
  editVideoTutorial,
  deleteVideoTutorial,
  upload,
  getTutorialById,
  getAllTutorials,
  getTutorialsByRpId,
};
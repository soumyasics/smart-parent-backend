const multer = require("multer");
const checkEmailAndPassword = async (req, res, next) => {
  try {
    const email = req.body?.email || null;
    const password = req.body?.password || null;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    } else {
      next();
    }
  } catch (error) {
    console.log("email and password validation error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadSingleImg = multer({ storage: storage }).array("files", 1);

module.exports = { checkEmailAndPassword, uploadSingleImg};

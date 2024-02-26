const RpModel = require("./rp/rpSchema.js");
const ParentModel = require("./Parent/parentSchema.js");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const isEmailUnique = async (req, res, next) => {
  try {
    const email = req.body?.email || null;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingRP = await RpModel.findOne({ email });
    if (existingRP) {
      return res.status(400).json({ message: "Email is already taken." });
    }
    const existingParent = await ParentModel.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: "Email is already taken." });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error on checking Email is not unique", error });
  }
};

module.exports = {
  upload,
  isEmailUnique,
};

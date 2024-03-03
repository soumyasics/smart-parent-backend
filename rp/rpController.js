const RpModel = require("./rpSchema.js");
const bcrypt = require("bcrypt");
const multer = require("multer");

//edited by soumya

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multipleUpload = multer({ storage: storage }).array("files",2);

const registerRp = async (req, res) => {
  try {
    const { name, email, password, contact, age, experienceYear } = req.body;
    if (req.files && req.files.length > 0) {
      console.log("ok");
  } else {
    console.log(" not ok");
  }
    const hashedPassword = await bcrypt.hash(password, 10);
console.log(req.files);
    // Construct RpModel object
    const rp = new RpModel({
      name,
      contact,
      experienceYear,
      email,
      age,
      profilePicture:req.files[0],
      certificateImg:req.files[1],
      password: hashedPassword,
    });
    console.log("rp", rp);
    await rp.save();

    return res.status(200).json({
      message: "Resource Person registered successfully",
      resourcePerson: rp,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error on registration rp.", error });
  }
};

const loginRp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const rp = await RpModel.findOne({ email });
    if (!rp) {
      return res
        .status(404)
        .json({ message: "Please check your Email id and password" });
    }

    const isPasswordValid = await bcrypt.compare(password, rp.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Please check your Email id and password" });
    }
    return res.status(200).json({ message: "Login successfull", rp });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

const viewAllRps = async (req, res) => {
  try {
    const rps = await RpModel.find();
    return res.status(200).json({ message: "All Rps", data: rps });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

const viewRpById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const rp = await RpModel.findById(id);
    if (!rp) {
      return res.status(404).json({ message: "rp not found" });
    }

    return res.status(200).json({ message: "rp", data: rp });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

// accept & reject routes
const acceptRegistration = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const rp = await RpModel.findById(id);
    if (!rp) {
      return res.status(404).json({ message: "rp not found" });
    }

    rp.isAdminApproved = "accepted";
    await rp.save();
    return res
      .status(200)
      .json({ message: "Resource Person registration accepted", data: rp });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on accept  rp", error });
  }
};

const rejectRegistration = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const rp = await RpModel.findById(id);
    if (!rp) {
      return res.status(404).json({ message: "rp not found" });
    }

    rp.isAdminApproved = "rejected";
    await rp.save();
    return res
      .status(200)
      .json({ message: "Resource Person registration rejected", data: rp });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on reject rp", error });
  }
};
module.exports = {
  registerRp,
  loginRp,
  viewAllRps,
  viewRpById,
  rejectRegistration,
  acceptRegistration,
  multipleUpload
};

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

const multipleUpload = multer({ storage: storage }).array("files", 2);

const registerRp = async (req, res) => {
  try {
    const { name, email, password, contact, age, experienceYear } = req.body;

    const existingRp = await RpModel.findOne({ email });
    if (existingRp) {
      return res
        .status(400)
        .json({ message: "Resource Person with this email already exists" });
    }

    if (req.files && req.files.length > 0) {
      console.log("ok");
    } else {
      console.log(" not ok");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const proImg = req?.files[0] || null;
    const certImg = req?.files[1] || null;
    // Construct RpModel object
    const rp = new RpModel({
      name,
      contact,
      experienceYear,
      email,
      age,
      profilePicture: proImg,
      certificateImg: certImg,
      password: hashedPassword,
    });
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
    if (rp.isAdminApproved == "rejected") {
      return res
        .status(404)
        .json({ message: "Your account has been rejected" });
    }
    if (rp.isAdminApproved == "pending") {
      return res
        .status(404)
        .json({ message: "Your account is not approved yet" });
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

const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  RpModel.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      RpModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          rating: rating,
        },
        { new: true }
      )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
    });
};

const RpCollection = async (req, res) => {
  try {
    const RpCollections = await RpModel.find({});
    const count = RpCollections.length;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//forgotvPawd  by id
const forgotPwd = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedrp = await RpModel.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { new: true } 
    );

    if (updatedrp) {
      return res.json({
        status: 200,
        msg: "Password updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "rp not found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      msg: "Failed to update password",
      error: err.message,
    });
  }
};const editrpById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const rp = await RpModel.findById(id);
    if (!rp) {
      return res.status(404).json({ message: "rp not found" });
    }

    const { name, email, password, contact, age, experienceYear } = req.body;

    let editingFields = {};

    if (name) {
      editingFields.name = name;
    }
    if (contact) {
      editingFields.contact = contact;
    }
    if (age) {
      editingFields.age = age;
    }
    if (experienceYear) {
      editingFields.experienceYear = experienceYear;
    }
    if (email) {
      editingFields.email = email;
    }
    if (password) {
      editingFields.password = password;
    }
    const updatedrp = await RpModel.findByIdAndUpdate(
      id,
      editingFields,
      { new: true }
    );

    return res
      .status(200)
      .json({
        message: "rp updated successfully",
        data: updatedrp,
      });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};


module.exports = {
  registerRp,
  loginRp,
  viewAllRps,
  viewRpById,
  rejectRegistration,
  acceptRegistration,
  multipleUpload,
  addRating,
  RpCollection,
  forgotPwd,
  editrpById
};

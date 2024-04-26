const CouncilarModel = require("./councilarSchema.js");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multipleUpload = multer({ storage: storage }).array("files", 2);

const registerCouncilar = async (req, res) => {
  try {
    const { name, email, password, contact, age, experienceYear } = req.body;

    const existingCounselor = await CouncilarModel.findOne({ email });
    if (existingCounselor) {
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

    const councilar = await new CouncilarModel({
      name,
      contact,
      age,
      experienceYear,
      email,
      profilePicture: proImg,
      certificateImg: certImg,
      password: hashedPassword,
    });

    await councilar.save();

    return res.status(200).json({
      message: "Counsellor registered successfully",
      data: councilar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error on registration counsellor.", error });
  }
};

const loginCouncilar = async (req, res) => {
  try {
    const { email, password } = req.body;

    const councilar = await CouncilarModel.findOne({ email });
    if (!councilar) {
      return res
        .status(404)
        .json({ message: "Please check your Email id and password" });
    }

    const isPasswordValid = await bcrypt.compare(password, councilar.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Please check your Email id and password" });
    }

    if (councilar.isAdminApproved == "rejected") {
      return res
        .status(404)
        .json({ message: "Your account has been rejected" });
    }
    if (councilar.isAdminApproved == "pending") {
      return res
        .status(404)
        .json({ message: "Your account is not approved yet" });
    }
    return res
      .status(200)
      .json({ message: "Login successfull", data: councilar });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

const viewAllCouncilars = async (req, res) => {
  try {
    const councilars = await CouncilarModel.find();

    return res
      .status(200)
      .json({ message: "All Councilars", data: councilars });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on login Councilars", error });
  }
};

const viewCouncilarById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const councilar = await CouncilarModel.findById(id);
    if (!councilar) {
      return res.status(404).json({ message: "Councilar not found" });
    }
    return res.status(200).json({ message: "Councilar", data: councilar });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

const editCouncilarById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const councilar = await CouncilarModel.findById(id);
    if (!councilar) {
      return res.status(404).json({ message: "Councilar not found" });
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
    const updatedCouncilar = await CouncilarModel.findByIdAndUpdate(
      id,
      editingFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Councilar updated successfully",
      data: updatedCouncilar,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

const deleteCouncilarById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const councilar = await CouncilarModel.findById(id);
    if (!councilar) {
      return res.status(404).json({ message: "Councilar not found" });
    }

    await CouncilarModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Councilar deleted successfully", data: councilar });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

const updatePassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedCouncilar = await CouncilarModel.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { new: true }
    );

    if (updatedCouncilar) {
      return res.json({
        status: 200,
        msg: "Password updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "Councilar not found",
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
};

const counsellorCollection = async (req, res) => {
  try {
    const counsellorCollections = await CouncilarModel.find({});
    const count = counsellorCollections.length;
    res.json({ count });
    // console.log(counsellorCollections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//soumya
const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  CouncilarModel.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      CouncilarModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          rating: rating,
        }
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

// const viewCouncillorReqs = (req, res) => {
//   CouncilarModel
//     .find({isAdminApproved:false})
//     .exec()
//     .then((data) => {
//       if (data.length > 0) {
//         res.json({
//           status: 200,
//           msg: "Data obtained successfully",
//           data: data,
//         });
//       } else {
//         res.json({
//           status: 200,
//           data:data,
//           msg: "No Data obtained ",
//         });
//       }
//     })
//     .catch((err) => {
//       res.json({
//         status: 500,
//         msg: "Data not Inserted",
//         Error: err,
//       });
//     });
// };

// view  finished

//Approve Councillors

// const approveCouncillorById = (req, res) => {
//   CouncilarModel
//     .findByIdAndUpdate({_id:req.params.id},{isAdminApproved:true})
//     .exec()
//     .then((result) => {
//       res.json({
//           status: 200,
//           data: result,
//           msg: 'data obtained'
//       })
//   })
//   .catch(err => {
//       res.json({
//           status: 500,
//           msg: 'Error in API',
//           err: err
//       })
//   })
// };

const acceptRegistrationCounsellor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const councilar = await CouncilarModel.findById(id);
    if (!councilar) {
      return res.status(404).json({ message: "councilar not found" });
    }

    councilar.isAdminApproved = "accepted";
    await councilar.save();
    return res
      .status(200)
      .json({ message: "Counsellor registration accepted", data: councilar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on accept councilar", error });
  }
};

const rejectRegistrationCounsellor = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const councilar = await CouncilarModel.findById(id);
    if (!councilar) {
      return res.status(404).json({ message: "Councilar not found" });
    }

    councilar.isAdminApproved = "rejected";
    await councilar.save();
    return res
      .status(200)
      .json({ message: "Counsellor registration rejected", data: councilar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on reject Councilar", error });
  }
};

const banCounselor = async (req, res) => {
  try {
    const {cId} = req.body;
    if (!cId) {
      return res.status(400).json({ message: "Counsellor Id is required" });
    }
    const currCounsellor = await CouncilarModel.findById(cId);
    if (!currCounsellor) {
      return res.status(404).json({ message: "Councilar not found" });
    }
    currCounsellor.status = "banned";

    await currCounsellor.save();
    return res
      .status(200)
      .json({ message: "Councilar banned successfully", data: currCounsellor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error on ban Councilar", error });
  }
};
const unBanCounselor = async (req, res) => {
  try {
    const {cId} = req.body;
    if (!cId) {
      return res.status(400).json({ message: "Id is required" });
    }
    const councilar = await CouncilarModel.findById(cId);
    if (!councilar) {
      return res.status(404).json({ message: "Councilar not found" });
    }
    councilar.status = "active";
    await councilar.save();
    return res
      .status(200)
      .json({ message: "Councilar unbanned successfully", data: councilar });
  } catch (err) {
    return res
      .status(500)
      .json({ err, message: "Server error on unban counselor" });
  }
};
const viewAllBannedCounselor = async (req, res) => {
  try {
    const allBannedCounselors = await CouncilarModel.find({ status: "banned" });
    return res.status(200).json({
      message: "All banned counsellors",
      data: allBannedCounselors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving complaints",
      error: error,
    });
  }
};
module.exports = {
  registerCouncilar,
  loginCouncilar,
  viewAllCouncilars,
  viewCouncilarById,
  editCouncilarById,
  updatePassword,
  deleteCouncilarById,
  counsellorCollection,
  multipleUpload,
  addRating,
  acceptRegistrationCounsellor,
  rejectRegistrationCounsellor,
  banCounselor,
  unBanCounselor,
  viewAllBannedCounselor
};

const CouncilarModel = require("./councilarSchema.js");
const bcrypt = require("bcrypt");
const registerCouncilar = async (req, res) => {
  try {
    const { name, email, password, contact, age, experienceYear } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const councilar = await new CouncilarModel({
      name,
      contact,
      age,
      experienceYear,
      email,
      password: hashedPassword,
    });

    await councilar.save();

    return res.status(200).json({
      message: "Resource Person registered successfully",
      data: councilar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error on registration rp.", error });
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
    return res.status(500).json({ message: "server error on login rp", error });
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

    return res
      .status(200)
      .json({
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
    const { id, password } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const councilar = await CouncilarModel.findById(id);
    if (!councilar) {
      return res.status(404).json({ message: "Councilar not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedCouncilar = await CouncilarModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    return res
      .status(200)
      .json({
        message: "Password updated successfully",
        data: updatedCouncilar,
      });
  } catch (error) {
    return res.status(500).json({ message: "server error on login rp", error });
  }
};

module.exports = {
  registerCouncilar,
  loginCouncilar,
  viewAllCouncilars,
  viewCouncilarById,
  editCouncilarById,
  updatePassword,
  deleteCouncilarById
};

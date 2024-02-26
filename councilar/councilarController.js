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

module.exports = { registerCouncilar, loginCouncilar };

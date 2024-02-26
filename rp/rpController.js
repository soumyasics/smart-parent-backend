const RpModel = require("./rpSchema.js");
const bcrypt = require("bcrypt");
const registerRp = async (req, res) => {
  try {
    const { name, email, password, contact, age, experienceYear } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const rp = await new RpModel({
      name,
      contact,
      experienceYear,
      email,
      age,
      password: hashedPassword,
    });

    await rp.save();

    return res.status(200).json({
      message: "Resource Person registered successfully",
      resourcePerson: rp,
    });
  } catch (error) {
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

module.exports = { registerRp, loginRp };

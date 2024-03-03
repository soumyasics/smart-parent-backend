const checkEmailAndPassword = async (req, res, next) => {
  try {
    console.log("req",req.body);
    console.log("req",req.files);
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


module.exports = { checkEmailAndPassword};

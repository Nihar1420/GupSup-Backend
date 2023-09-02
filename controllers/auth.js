const registeredUserModel = require("../models/registeredUsers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userConfirmPassword } = req.body;
    if (!userName || !userPassword || !userEmail || !userConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter the required details",
      });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const registerUser = await registeredUserModel.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
      userConfirmPassword: hashedPassword,
    });
    await registerUser.save();
    if (!registerUser) {
      return res.status(502).json({
        success: false,
        messgae: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      data: registerUser,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const authController = {
  register,
};

module.exports = authController;

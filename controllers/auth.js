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
    const emailExists = await registeredUserModel.findOne({
      userEmail: userEmail,
    });
    if (emailExists) {
      return res.status(200).json({
        success: false,
        message: "Email already exists",
        status: 400,
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
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      data: registerUser,
      message: "User registered successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter the required details",
      });
    }
    const findUser = await registeredUserModel.findOne({
      userEmail: userEmail,
    });
    if (!findUser) {
      return res.status(200).json({
        success: false,
        message: "User doesn't exist",
        status: 400,
      });
    }
    const checkPassword = await bcrypt.compare(
      userPassword,
      findUser.userPassword
    );
    if (!checkPassword) {
      return res.status(200).json({
        success: false,
        message: "Please enter the correct password",
        status: 400,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      data: findUser,
      status: 200,
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
  login,
};

module.exports = authController;

const registeredUserModel = require("../models/registeredUsers");

const getAllContacts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please enter the required field",
      });
    }
    const allContacts = await registeredUserModel
      .find({
        _id: { $ne: userId },
      })
      .select(["userName", "userEmail", "avatarImage", "_id"]);
    if (!allContacts || allContacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No contacts found",
      });
    }
    return res.status(200).json({
      success: true,
      data: allContacts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const usersController = {
  getAllContacts,
};

module.exports = usersController;

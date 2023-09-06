const registeredUserModel = require("../models/registeredUsers");

const setProfilePicture = async (req, res) => {
  try {
    const { avatarImage, userId } = req.body;
    if (!avatarImage || !userId) {
      return res.status(400).json({
        success: false,
        message: "Enter the required details",
      });
    }
    const setAvatarImage = await registeredUserModel.updateOne(
      { _id: userId },
      {
        avatarImage: avatarImage,
        isAvatarImageSet: true,
      }
    );
    if (!setAvatarImage) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      data: setAvatarImage,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const profileController = {
  setProfilePicture,
};

module.exports = {
  profileController,
};

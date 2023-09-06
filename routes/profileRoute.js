const express = require("express");
const { profileController } = require("../controllers/profile");
const profileRouter = express.Router();

profileRouter.post("/set-avatar", profileController.setProfilePicture);

module.exports = profileRouter;
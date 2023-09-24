const express = require("express");
const messageController = require("../controllers/messageFunctionality");
const messageRouter = express.Router();

messageRouter.post("/send-message", messageController.sendMessage);

module.exports = messageRouter;

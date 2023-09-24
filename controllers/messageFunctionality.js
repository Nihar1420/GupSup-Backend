const messages = require("../models/messages");

const sendMessage = async (req, res) => {
  try {
    const { senderId, getterId, message } = req.body;
    if (!senderId || !getterId || !message) {
      return res.status(400).json({
        success: false,
        message: "Please enter the required fields",
      });
    }
    const messageData = await messages.create({
      message: {
        text: message,
        users: [senderId, getterId],
        senderId: senderId,
      },
    });
    if (!messageData) {
      return res.status(400).json({
        success: false,
        messsage: "Something went wrong while sending the message",
      });
    }
    return res.status(200).json({
      success: true,
      data: messageData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const messageController = {
  sendMessage,
};

module.exports = messageController;

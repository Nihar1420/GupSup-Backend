const { default: mongoose } = require("mongoose");

const messageModel = mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: Array,
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisteredUsers",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageModel);

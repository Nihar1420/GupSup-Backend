const mongoose = require("mongoose");

const registeredUserSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
    unique: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
  userConfirmPassword: {
    type: String,
    require: true,
  },
});

const registeredUserModel = mongoose.model('RegisteredUsers' , registeredUserSchema);

module.exports = registeredUserModel;

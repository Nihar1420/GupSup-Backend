const express = require("express");
const usersController = require("../controllers/users");
const usersRouter = express.Router();

usersRouter.post("/getAllContacts", usersController.getAllContacts);

module.exports = usersRouter;

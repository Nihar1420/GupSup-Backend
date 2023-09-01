const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_DB);
    console.log("Database connected successfully");
    console.log(connect.connection.host);
  } catch (error) {
    return error;
  }
};

module.exports = dbConnect;

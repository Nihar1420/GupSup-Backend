const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const dbConnect = require("./config/db_config.js");
const authRouter = require("./routes/authRoute.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
dbConnect();
app.listen(PORT, () => {
  console.log(`The server is up and running on PORT : ${PORT}`);
});

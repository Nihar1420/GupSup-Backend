const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const dbConnect = require("./config/db_config.js");
const authRouter = require("./routes/authRoute.js");
const profileRouter = require("./routes/profileRoute.js");
const usersRouter = require("./routes/usersRoute.js");
const messageRouter = require("./routes/messageRoute.js");
const socket = require("socket.io");

const expressApp = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["PUT", "GET", "POST"],
};

expressApp.use(cors(corsOptions));
expressApp.use(express.json());
expressApp.use("/api/auth", authRouter);
expressApp.use("/api/profile", profileRouter);
expressApp.use("/api/users", usersRouter);
expressApp.use("/api/message", messageRouter);

dbConnect();

const server = expressApp.listen(PORT, () => {
  console.log(`The server is up and running on PORT : ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["PUT", "GET", "POST"],
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("user-login", ({loggedInUserId}) => {
    users[loggedInUserId] = socket;
    console.log(`${loggedInUserId} has logged in`);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
    for (const userId in users) {
      if (users[userId] === socket) {
        delete users[userId];
        console.log(`${userId} has disconnected`);
        break;
      }
    }
  });
  socket.on("send-message", ({ senderId, getterId, message }) => {
    if (users[getterId]) {
      socket.broadcast.emit("receive-message", { senderId,getterId, message });
      console.log(`${senderId} has sent "${message}" to ${getterId}`);
    } else {
      console.log(`${getterId} is not connected.`);
    }
  });
});

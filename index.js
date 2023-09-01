const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const dbConnect = require('./config/db_config.js');

const app = express();

app.use(cors());
app.use(express.json());
dbConnect();
app.listen(PORT , () => {
    console.log(`The server is up and running on PORT : ${PORT}`);
})
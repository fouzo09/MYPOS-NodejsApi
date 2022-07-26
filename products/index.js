const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const postRouter = require("./routes");

const app = express();
const PORT = 5000;


mongoose.connect(process.env.MONGO_URI)
        .then((result)=>app.listen(PORT))
        .catch((error)=>console.log(error));

app.use(bodyParser.json());
app.use("/v1/api/post", postRouter);
const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require("mongoose");
const categorieRouter = require('./routes');
const categoryConfig = require('../gateway/src/utils/category.config');
require('dotenv').config();

const app = express();
const PORT = categoryConfig.port;

mongoose.connect(process.env.MONGO_URI)
        .then((result)=> app.listen(PORT))
        .catch((error)=> console.log(error));
app.use(bodyParser.json());
app.use("/category", categorieRouter);



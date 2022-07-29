const bodyParser = require('body-parser')
const express = require("express");
const categorieRouter = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use("/", categorieRouter);

module.exports = app;
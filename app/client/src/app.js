const express = require("express");
const bodyParser = require('body-parser');
const clientRouter = require('../routes');

const app = express();
app.use(bodyParser.json());
app.use("/", clientRouter);

module.exports = app;
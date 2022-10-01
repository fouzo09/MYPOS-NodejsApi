const express = require("express");
const bodyParser = require('body-parser');
const venteRouter = require('../routes');

const app = express();
app.use(bodyParser.json());
app.use("/", venteRouter);

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const productRouter = require("../routes");

const app = express();

app.use(bodyParser.json());
app.use("/", productRouter);

module.exports = app;
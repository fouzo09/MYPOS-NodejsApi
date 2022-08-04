const mongoose = require("mongoose");
require("dotenv").config();
const app = require('./src/app');

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
        .then((result)=>app.listen(PORT))
        .catch((error)=>console.log(error));

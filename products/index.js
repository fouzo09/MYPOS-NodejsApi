const mongoose = require("mongoose");
require("dotenv").config();
const app = require('./src/app');
const productConfig = require('../gateway/src/utils/product.config');
const PORT = productConfig.port;

mongoose.connect(process.env.MONGO_URI)
        .then((result)=>app.listen(PORT))
        .catch((error)=>console.log(error));

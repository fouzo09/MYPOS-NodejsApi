const mongoose = require("mongoose");
const app = require('./src/app');
const categoryConfig = require('./shared/utils/category.config');
require('dotenv').config();

const PORT = categoryConfig.port;

mongoose.connect(process.env.MONGO_URI)
        .then((result)=> app.listen(PORT))
        .catch((error)=> console.log(error));



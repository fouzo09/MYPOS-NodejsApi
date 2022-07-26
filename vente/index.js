const app = require('./src/app');
const venteConfig = require('../gateway/src/utils/vente.config');
const mongoose = require("mongoose");

const PORT = venteConfig.port;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
        .then((result)=> app.listen(PORT))
        .catch((error)=> console.log(error));




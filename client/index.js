const app = require('./src/app');
const clientConfig = require('./shared/utils/client.config');
const mongoose = require("mongoose");

const PORT = clientConfig.port;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
        .then((result)=> app.listen(PORT))
        .catch((error)=> console.log(error));




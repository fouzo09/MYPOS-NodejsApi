const mongoose = require('mongoose');
const app = require('./src/app');
const authConfig = require('../gateway/src/utils/auth.config');
require('dotenv').config();

const PORT = authConfig.port;
process.title = 'MYPOS';

mongoose.connect(process.env.MONGO_URI)
        .then(()=> app.listen(PORT))
        .catch((error)=> console.log(error));

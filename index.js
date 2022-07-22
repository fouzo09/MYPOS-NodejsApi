const mongoose = require('mongoose');
const app = require('./src/app');

require('dotenv').config();

const PORT = 5001;
process.title = 'MYPOS';

mongoose.connect(process.env.MONGO_URI)
        .then(()=> app.listen(PORT))
        .catch((error)=> console.log(error));

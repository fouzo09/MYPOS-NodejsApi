const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const router = require('./routes/routes');
const api = require('./routes/api');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./middleware/auth');

app.use(bodyParse.json());
app.use(session({secret: 'app'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/api', api);

module.exports = app;
const express = require('express');
const session = require('express-session');
const bodyParse = require('body-parser');
const app = express();
const passport = require('passport');
const routes = require('./routes');

require('dotenv').config();
require('./middleware/auth');

app.use(bodyParse.json());
app.use(session({secret: 'app'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

module.exports = app;
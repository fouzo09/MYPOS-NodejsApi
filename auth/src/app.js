const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParse = require('body-parser');
const app = express();
const passport = require('passport');
const routes = require('./routes');

require('dotenv').config();
require('./middleware/auth');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));

app.use(bodyParse.json());
app.use(session({ secret: 'mypos',
                  resave: true,
                  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

module.exports = app;
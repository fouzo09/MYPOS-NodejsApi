const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const { Register, Login } = require('./controllers/user');
require('dotenv').config();
const PORT = 5000;

app.use(bodyParse.json());

app.get('/', (req, res)=>{ return res.json('Salut') });

app.post('/api/1.0/register', Register);
app.post('/api/1.0/register', Login);

module.exports = app;
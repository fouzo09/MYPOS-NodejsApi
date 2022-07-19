const express = require('express');
const api = express.Router();
const { Register, Login } = require('../controllers/user');

api.post('/1.0/register', Register);
api.post('/1.0/login', Login);

module.exports = api;
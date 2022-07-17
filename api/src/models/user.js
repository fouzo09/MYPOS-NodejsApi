const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    phone: String, 
    password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
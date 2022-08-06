const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'L\'email de l\'utilisateur est obligatoire.']
    },
    firstName: {
        type: String,
        required: [true, 'Le prenom de l\'utilisateur est obligatoire.']
    },
    lastName: {
        type: String,
        required: [true, 'Le nom de l\'utilisateur est obligatoire.']
    },
    phone: {
        type: String,
        required: [true, 'Le numero de telephone de l\'utilisateur est obligatoire.']
    }, 
    password: {
        type: String,
        required: [true, 'Le mot de passe l de l\'utilisateur est obligatoire.'],
        min: [6, 'Le mot de passe doit avoir au minimum 6 caracteres']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
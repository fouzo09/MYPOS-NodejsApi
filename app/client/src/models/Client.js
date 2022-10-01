const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: [true, 'Le nom complet est obligatoire']
    },
    telephone: {
        type: String,
        unique: [true, 'Ce numero de telephone est deja utilise'],
        require: [true, 'Le numero de telephone est obligatoire']
    },
    adresse: {
        type: String,
        require: [true, 'L\'adresse est obligatoire']
    }
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
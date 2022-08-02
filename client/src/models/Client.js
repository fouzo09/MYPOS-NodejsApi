const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: [true, 'Le nom complet est obligatoire'],

    },
    telephone: {
        type: String,
        unique: [true, 'Ce numero de telephon est deja utilise']
    },
    adresse: String
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
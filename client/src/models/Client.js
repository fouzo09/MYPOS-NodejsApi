const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    fullName: String,
    telephone: String,
    adresse: String
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
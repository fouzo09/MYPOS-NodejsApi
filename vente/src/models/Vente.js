const mongoose = require("mongoose");

const VenteSchema = mongoose.Schema({
    client: Object,
    produits: Array,
    mth: Number,
    taxe: Number,
    mttc: Number,
    date: Date
});

const Vente = mongoose.model("Vente", VenteSchema);
module.exports = Vente;
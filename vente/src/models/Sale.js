const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema({
    customer: {
        type: Object,
        required: [true, 'Les information du client sont obligatoire.'],
    },
    products: {
        type: Object,
        required: [true, 'La liste des produit est obligatoire.'],
    },
    montantHorsTaxe: {
        type: Number,
        required: [true, 'Le montant hors taxe est obligatoire.'],
    },
    taxe: {
        type: Number,
        default: 0
    },
    montantToutTaxeConfondu: {
        type: Number,
        required: [true, 'Le montant tout taxe est obligatoire.'],
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Sale = mongoose.model("Sale", SaleSchema);
module.exports = Sale;
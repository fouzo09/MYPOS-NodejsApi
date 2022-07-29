const mongoose = require("mongoose");

const CategorieSchema = mongoose.Schema({
    name: {
        require: [true, 'Le nom de categorie est obligatoire.'],
        type: String,
        unique: [true, 'Ce nom de categorie est deja utilisé.']
    },
    date: Date
});

const Categorie = mongoose.model("Categorie", CategorieSchema);
module.exports = Categorie;
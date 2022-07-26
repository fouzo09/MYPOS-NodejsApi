const mongoose = require("mongoose");

const CategorieSchema = mongoose.Schema({
    name: String,
    date: Date
});

const Categorie = mongoose.model("Categorie", CategorieSchema);
module.exports = Categorie;
const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Le nom du produit est obligatoire.'],
        unique: [true, 'Le nom du produit est existe deja.']
    },
    description: {
        type: String,
        require: [true, 'Le nom du produit est obligatoire.'],
    },
    image: {
        type: String,
        require: [true, 'Le nom du produit est obligatoire.'],
    },
    date: {
        type: Date
    }    
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
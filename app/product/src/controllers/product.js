var multer  =   require('multer');
const Product = require("../models/Product.js");  
const amqpConnect = require('../events/connect');

(async()=>{
    await amqpConnect();
})();

const getProducts = (req, res)=>{
    Product.find({})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(401).json(result));
}

const createProduct = (req, res)=>{
    Product.create(req.body)
        .then((result)=> res.status(200).json(result))
        .catch((error)=>res.status(401).json(error));
}


const getProduct = (req, res)=>{
    Product.find({_id: req.params.productID})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(401).json("Produit non trouvé"));
}

const updateProduct = (req, res)=>{
    Product.findOneAndUpdate({_id: req.params.productID}, req.body)
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(401).json("Produit non trouvé"));
}

const deleteProduct = (req, res)=>{
    Product.findOneAndDelete({_id: req.params.productID})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(401).json("Produit non trouvé"));
}

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}
const Categorie = require("../models/Categorie.js");


const createCategorie = (req, res)=>{
    Categorie.create({...req.body, "date": new Date()})
             .then(result => res.status(200).json(result))
             .catch(error => res.status(401).json({message: error}));                
}

const getCategories = (req, res)=>{
    Categorie.find({})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : error}));
}

const getCategorie = (req, res)=>{
    Categorie.find({_id: req.params.categorieID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : "Categorie non trouvée"}));

}

const updateCategorie = (req, res)=>{
    Categorie.updateOne({_id: req.params.categorieID}, req.body)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : "Categorie non trouvée"}));

}

const deleteCategorie = (req, res)=>{
    Categorie.findOneAndDelete({_id: req.params.categorieID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : "Categorie non trouvée"}));

}


module.exports = {
    createCategorie,
    getCategories,
    getCategorie,
    updateCategorie,
    deleteCategorie
};



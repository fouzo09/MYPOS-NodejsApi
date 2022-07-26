const Vente = require("../models/Vente.js");


const createVente = (req, res)=>{
    
   Vente.create(req.body)
             .then(result => res.status(200).json(result))
             .catch(error => res.status(500).json({message: error}));                
}

const getVentes = (req, res)=>{
   Vente.find({})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : error}));
}

const getVente = (req, res)=>{
   Vente.find({_id: req.params.venteID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : "Vente non trouvée"}));

}

const updateVente = (req, res)=>{
   Vente.updateOne({_id: req.params.venteID}, {"name": req.body.name},)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : "Vente non trouvée"}));

}

const deleteVente = (req, res)=>{
   Vente.findOneAndDelete({_id: req.params.venteID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : "Vente non trouvée"}));

}


module.exports = {
    createVente,
    getVentes,
    getVente,
    updateVente,
    deleteVente
};



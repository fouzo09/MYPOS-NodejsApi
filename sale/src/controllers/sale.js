const Sale = require("../models/Sale.js");


const createSale = (req, res)=>{    
   Sale.create(req.body)
             .then(result => res.status(200).json(result))
             .catch(error => res.status(401).json({message: error}));                
}

const getSales = (req, res)=>{
   Sale.find({})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : error}));
}

const getSale = (req, res)=>{
   Sale.find({_id: req.params.saleID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : "Vente non trouvée"}));

}

const updateSale = (req, res)=>{
   Sale.updateOne({_id: req.params.saleID}, {"name": req.body.name},)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : "Vente non trouvée"}));

}

const deleteSale = (req, res)=>{
   Sale.findOneAndDelete({_id: req.params.saleID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({message : "Vente non trouvée"}));

}


module.exports = {
   createSale,
   getSales,
   getSale,
   updateSale,
   deleteSale
};



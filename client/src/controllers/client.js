const Client = require("../models/Client.js");


const createClient = (req, res)=>{
    
    Client.create(req.body)
             .then(result => res.status(200).json(result))
             .catch(error => res.status(500).json({message: error}));                
}

const getClients = (req, res)=>{
    Client.find({})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : error}));
}

const getClient = (req, res)=>{
    Client.find({_id: req.params.clientID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : "Client non trouvée"}));

}

const updateClient = (req, res)=>{
    Client.updateOne({_id: req.params.clientID}, {"name": req.body.name},)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : "Client non trouvée"}));

}

const deleteClient = (req, res)=>{
    Client.findOneAndDelete({_id: req.params.clientID})
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({message : "Client non trouvée"}));

}


module.exports = {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
};



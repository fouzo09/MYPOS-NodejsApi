const express = require("express");
const venteRouter = express.Router();

const { 
        createVente,
        getVentes,
        getVente,
        updateVente,
        deleteVente
    } = require('./src/controllers/vente.js');
venteRouter.get('/', getVentes);
venteRouter.get('/:venteID', getVente);
venteRouter.post('/', createVente);
venteRouter.put('/:venteID', updateVente);
venteRouter.delete('/:venteID', deleteVente);

module.exports = venteRouter;
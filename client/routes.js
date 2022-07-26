const express = require("express");
const clientRouter = express.Router();

const { 
        createClient,
        getClients,
        getClient,
        updateClient,
        deleteClient
    } = require('./src/controllers/client.js');
clientRouter.get('/', getClients);
clientRouter.get('/:clientID', getClient);
clientRouter.post('/', createClient);
clientRouter.put('/:clientID', updateClient);
clientRouter.delete('/:clientID', deleteClient);

module.exports = clientRouter;
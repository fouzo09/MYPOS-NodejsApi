const express = require('express');
const axios = require('axios');
const routes = express.Router();
const registry = require('./utils/registry.json');
const isAuthenticated = require('./middleware/auth.middleware');

routes.all('/:apiName/:path?', isAuthenticated, async(req, res)=>{

    try {
        
        if(!registry.services[req.params.apiName]) 
            return res.status(401).json('Ce service n\'existe pas.');
        
        const { method, headers, body: data } = req;
        const url = getUrl(req.params);
        const result = await axios({ method, url, data});
        
        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json(error);
    }
});

const getUrl = (params)=>{
    
    return (params.path) ? `${registry.services[params.apiName].url}/${params.path}` 
                        :`${registry.services[params.apiName].url}`;
}

module.exports = routes;
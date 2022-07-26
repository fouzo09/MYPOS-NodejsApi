const express = require('express');
const axios = require('axios');
const routes = express.Router();
const registry = require('./utils/registry.json');

routes.all('/:apiName/:path?', async(req, res)=>{

    try {
        
        if(!registry.services[req.params.apiName]) return res.status(401).json('L\'API n\'existe pas.');
        
        const { method, headers, body } = req;
        const url = getUrl(req.params);
        const result = await axios({ method: method, url: url, headers: headers, data: body });
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
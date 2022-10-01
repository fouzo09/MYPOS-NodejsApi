const jwt = require('jsonwebtoken');
const registry = require('../utils/registry.json');

const isAuthenticated = (req, res, next) =>{

  if(registry.services[req.params.apiName]) {

    const service = registry.services[req.params.apiName];

    if(service.isSecure){
        verifyUserToken(req, res, next);
    }else{
        next();
    }
  }
  
}

const verifyUserToken = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
 
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = isAuthenticated;
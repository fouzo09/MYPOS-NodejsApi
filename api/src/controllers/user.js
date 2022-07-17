const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SALT = 10;

const Register = async(req, res)=>{
    
    const password = await bcrypt.hash(req.body.password, SALT);
    const user = await User.create({...req.body, password: password});
    return res.status(200).json(user);
}

const Login = async(req, res)=>{

    const {email, password} = req.body;
    const user = User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({user_id: user._id, email}, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN});
        user.token = token;
        return res.status(200).json(user);
    }

    return res.status(400).json('Utilisateur non trouvé');
}


module.exports = { Register, Login };
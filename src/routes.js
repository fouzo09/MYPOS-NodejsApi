const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Register, Login } = require('./controllers/user');

const isLogged = false;
const CLIENT_URL = 'http://localhost:3000/login';

const isLoggedIn = (req, res, next)=>{
    (req.user) ? next() : res.status(401).json('Accès non autorisé.');
}

router.post('/1.0/register', Register);
router.post('/1.0/auth', Login);
router.get('/1.0/auth-google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/1.0/google/callback', passport.authenticate('google', 
        { successRedirect: CLIENT_URL, failureRedirect: CLIENT_URL }));

router.get('/1.0/auth-google/success', (req, res)=>{
    if(req.user){
        res.status(200).json({
            message: 'Utilisateur connecté avec succès',
            user: req.user
        });
    }else{
        res.status(401).json({
            message: 'Erreur d\'authentification',
        });
    }
});

router.get('/1.0/logout', isLoggedIn, (req, res)=>{ 
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.status(200).json('Utilisateur deconnecté avec succès.');
    });
});

module.exports = router;
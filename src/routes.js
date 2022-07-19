const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Register, Login } = require('./controllers/user');

const isLogged = false;

const isLoggedIn = (req, res, next)=>{
    (req.user) ? next() : res.status(401).json('Accès non autorisé.');
}

router.post('/1.0/register', Register);
router.post('/1.0/auth', Login);
router.get('/1.0/auth-google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/1.0/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/1.0/logout', isLoggedIn, (req, res)=>{ 
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.status(200).json('Utilisateur deconnecté avec succès.');
    });
});

module.exports = router;
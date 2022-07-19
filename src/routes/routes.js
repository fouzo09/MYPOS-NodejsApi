const express = require('express');
const router = express.Router();
const passport = require('passport');

const isLogged = false;

const isLoggedIn = (req, res, next)=>{
    (req.user) ? next() : res.redirect('/login');
}


router.get('/login', (req, res)=>{ 
    res.send(`<a href="authentication-with-google">Auth with google</a>`)
});

router.get('/', isLoggedIn,  (req, res)=>{ 
    res.send(`<h1>Home ${req.user.displayName}</h1> <a href="logout">Logout</a>`)
});

router.get('/authentication-with-google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', (req, res)=>{ 
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/login');
    });
});

module.exports = router;
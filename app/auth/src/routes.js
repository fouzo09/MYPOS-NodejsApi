const express = require('express');
const router = express.Router();
const { Register, Login } = require('./controllers/user');

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', (req, res)=>{ 
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.status(200).json('Utilisateur deconnecté avec succès.');
    });
});

module.exports = router;
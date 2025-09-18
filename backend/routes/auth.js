const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); // Route pour l'inscription
router.post('/login', login); // Route pour la connexion

module.exports = router;

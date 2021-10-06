const express = require('express');
const router = express.Router();

// Route controllers
const { insertPair, getPair } = require('../controllers/distance');

// Routes
router.post('/', insertPair);
router.get('/', getPair);

module.exports = router;
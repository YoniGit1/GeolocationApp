const express = require('express');
const router = express.Router();

// Route controllers
const { getHello } = require('../controllers/hello');

// Routes
router.get('/', getHello);

module.exports = router;
const express = require('express');
const router = express.Router();

// Route controllers
const { dbStatus } = require('../controllers/health');

// Routes
router.get('/', dbStatus);

module.exports = router;
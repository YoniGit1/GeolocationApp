const express = require('express');
const router = express.Router();

// Route controllers
const { getPopularSearch } = require('../controllers/popularSearch');

// Routes
router.get('/', getPopularSearch);

module.exports = router;
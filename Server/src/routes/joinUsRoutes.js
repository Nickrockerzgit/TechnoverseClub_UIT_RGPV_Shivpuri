const express = require('express');
const router = express.Router();
const joinUsController = require('../controllers/joinUsController');

// Join us routes
router.post('/', joinUsController.joinUs);
router.get('/data', joinUsController.getJoinUsData);

module.exports = router;
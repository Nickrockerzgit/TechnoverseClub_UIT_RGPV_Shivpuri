const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');
const { upload } = require('../config/multer');

// Carousel routes
router.post('/upload-slide', upload.array('image', 3), carouselController.uploadSlide);
router.get('/get-slides', carouselController.getSlides);

module.exports = router;
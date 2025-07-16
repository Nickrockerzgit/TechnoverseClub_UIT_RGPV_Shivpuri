const express = require('express');
const router = express.Router();
const vlogController = require('../controllers/vlogController');
const { upload } = require('../config/multer');

// Vlog routes
router.post('/upload-vlog', upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), vlogController.uploadVlog);
router.get('/get-vlogs', vlogController.getVlogs);
router.post('/increment-views/:id', vlogController.incrementViews);
router.post('/like-vlog/:id', vlogController.likeVlog);

module.exports = router;
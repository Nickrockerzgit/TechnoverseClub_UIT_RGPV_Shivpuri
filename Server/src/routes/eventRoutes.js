const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const registrationController = require('../controllers/registrationController');
const { upload } = require('../config/multer');

// Event routes
router.post('/upload-event-image', upload.single('image'), eventController.uploadEventImage);
router.post('/update-events', eventController.updateEvents);
router.get('/get-events', eventController.getEvents);
router.get('/get-event/:id', eventController.getEvent);
router.delete('/delete-event/:id', eventController.deleteEvent);

// Event registration routes
router.post('/register', upload.single('proposal'), registrationController.registerEvent);
router.get('/registrations', registrationController.getRegistrations);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Auth routes
// router.post('/signup', authController.signup);
// router.post('/signin', authController.signin);
// router.post('/forgot-password', authController.forgotPassword);

// module.exports = router;




const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup/send-otp', authController.sendSignupOTP);
router.post('/signup/verify-otp', authController.verifySignupOTP);
router.post('/login/send-otp', authController.sendLoginOTP);
router.post('/login/verify-otp', authController.verifyLoginOTP);

module.exports = router;

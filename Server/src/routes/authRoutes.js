// //auth router
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/signup/send-otp', authController.sendSignupOTP);
// router.post('/signup/verify-otp', authController.verifySignupOTP);
// router.post('/login/send-otp', authController.sendLoginOTP);
// router.post('/login/verify-otp', authController.verifyLoginOTP);

// module.exports = router;





//after google api code 
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// OTP routes
router.post('/signup/send-otp', authController.sendSignupOTP);
router.post('/signup/verify-otp', authController.verifySignupOTP);
router.post('/login/send-otp', authController.sendLoginOTP);
router.post('/login/verify-otp', authController.verifyLoginOTP);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Google Sign-In
router.post('/google', authController.googleAuth);

module.exports = router;

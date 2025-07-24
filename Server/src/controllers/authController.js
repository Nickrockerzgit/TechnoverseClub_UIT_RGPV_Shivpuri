
// const { query } = require('../config/db');
// const { sendEmail } = require('../config/email');
// const emailTemplates = require('../utils/emailTemplates');
// const generateOTP = require('../utils/generateOTP');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const generateToken = require('../config/jwt');

// // Send OTP for Signup
// const sendSignupOTP = async (req, res) => {
//     const { name, email, phone, password } = req.body;
//     try {
//         const existingUser = await query("SELECT * FROM users WHERE email = ?", [email]);
//         if (existingUser.length > 0) {
//             return res.status(400).json({ message: "Email already registered" });
//         }

//         const otp = generateOTP();
//         const expiresAt = new Date(Date.now() + 5 * 60000); // 5 min

//         await query("INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)", [email, otp, expiresAt]);

//         await sendEmail(email, "Signup OTP - Technoverse", emailTemplates.otp(name, otp));

//         res.status(200).json({ message: "OTP sent to email" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to send OTP" });
//     }
// };


// // Verify Signup OTP and create account
// const verifySignupOTP = async (req, res) => {
//     const { name, email, phone, password, otp } = req.body;
//     try {
//         const [otpRecord] = await query("SELECT * FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1", [email]);
//         if (!otpRecord || otpRecord.otp !== otp || new Date(otpRecord.expires_at) < new Date()) {
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await query("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, hashedPassword]);
//         await query("DELETE FROM otps WHERE email = ?", [email]);

//         // ✅ Send welcome email
//         await sendEmail(email, "Welcome to Technoverse!", emailTemplates.welcome(name));

//         const token = generateToken({ email });
//         res.status(201).json({ message: "Signup successful", token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Signup failed" });
//     }
// };



// // Send OTP for Login
// const sendLoginOTP = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const [user] = await query("SELECT * FROM users WHERE email = ?", [email]);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const otp = generateOTP();
//         const expiresAt = new Date(Date.now() + 5 * 60000);

//         await query("INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)", [email, otp, expiresAt]);

//         await sendEmail(email, "Login OTP - Technoverse", emailTemplates.otp(user.name, otp));
//         res.status(200).json({ message: "OTP sent to email" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to send OTP" });
//     }
// };


// // Verify OTP and login
// const verifyLoginOTP = async (req, res) => {
//     const { email, otp } = req.body;
//     try {
//         const [otpRecord] = await query("SELECT * FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1", [email]);
//         if (!otpRecord || otpRecord.otp !== otp || new Date(otpRecord.expires_at) < new Date()) {
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         await query("DELETE FROM otps WHERE email = ?", [email]);

//         // ✅ Get user name to use in email
//         const [user] = await query("SELECT name FROM users WHERE email = ?", [email]);
//         if (user) {
//             await sendEmail(email, "New Sign In Detected", emailTemplates.signin(user.name));
//         }

//         const token = generateToken({ email });
//         res.status(200).json({ message: "Login successful", token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Login failed" });
//     }
// };

//  // Forgot password controller
// const forgotPassword = async (req, res) => {
//     const { email, newPassword } = req.body;

//     if (!email || !newPassword) {
//         return res.status(400).json({ message: "Email and new password are required." });
//     }

//     try {
//         console.log("Received email:", email);
//         const results = await query("SELECT * FROM users WHERE email = ?", [email]);
        
//         if (results.length === 0) {
//             console.warn("User not found:", email);
//             return res.status(404).json({ message: "User not found" });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         console.log("Hashed password:", hashedPassword);
        
//         // Update the password
//         await query(
//             "UPDATE users SET password = ? WHERE email = ?",
//             [hashedPassword, email]
//         );

//         console.log("Password updated for email:", email);
//         res.status(200).json({ message: "Password updated successfully!" });
//     } catch (error) {
//         console.error("Internal server error:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = {
//     sendSignupOTP,
//     verifySignupOTP,
//     sendLoginOTP,
//     verifyLoginOTP,
//     forgotPassword
// };














//after google auth code 
const { query } = require('../config/db');
const { sendEmail } = require('../config/email');
const emailTemplates = require('../utils/emailTemplates');
const generateOTP = require('../utils/generateOTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../config/jwt');

// Google Auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// -------------------- OTP SIGNUP --------------------
const sendSignupOTP = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingUser = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60000); // 5 min
    await query("INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)", [email, otp, expiresAt]);
    await sendEmail(email, "Signup OTP - Technoverse", emailTemplates.otp(name, otp));
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifySignupOTP = async (req, res) => {
  const { name, email, phone, password, otp } = req.body;
  try {
    const [otpRecord] = await query("SELECT * FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1", [email]);
    if (!otpRecord || otpRecord.otp !== otp || new Date(otpRecord.expires_at) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await query("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, hashedPassword]);
    await query("DELETE FROM otps WHERE email = ?", [email]);

    await sendEmail(email, "Welcome to Technoverse!", emailTemplates.welcome(name));

    const token = generateToken({ email });
    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// -------------------- OTP LOGIN --------------------
const sendLoginOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const [user] = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60000);
    await query("INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)", [email, otp, expiresAt]);
    await sendEmail(email, "Login OTP - Technoverse", emailTemplates.otp(user.name, otp));
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const [otpRecord] = await query("SELECT * FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1", [email]);
    if (!otpRecord || otpRecord.otp !== otp || new Date(otpRecord.expires_at) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await query("DELETE FROM otps WHERE email = ?", [email]);

    const [user] = await query("SELECT name FROM users WHERE email = ?", [email]);
    if (user) {
      await sendEmail(email, "New Sign In Detected", emailTemplates.signin(user.name));
    }

    const token = generateToken({ email });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

// -------------------- FORGOT PASSWORD --------------------
const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required." });
  }

  try {
    const results = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------- GOOGLE AUTH --------------------
const googleAuth = async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let [user] = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      await query("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", 
        [name, email, '', '']);
      [user] = await query("SELECT * FROM users WHERE email = ?", [email]);
    }

    const token = generateToken({ email });

    res.status(200).json({ 
      message: "Google sign-in successful", 
      token, 
      user: { name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ message: "Google authentication failed" });
  }
};

module.exports = {
  sendSignupOTP,
  verifySignupOTP,
  sendLoginOTP,
  verifyLoginOTP,
  forgotPassword,
  googleAuth
};

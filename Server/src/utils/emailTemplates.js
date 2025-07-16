const dotenv = require('dotenv');
dotenv.config();

const emailTemplates = {
    welcome: (name) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4a5568; text-align: center;">Welcome to Our Platform!</h2>
            <p style="color: #4a5568; font-size: 16px;">Hello ${name},</p>
            <p style="color: #4a5568; font-size: 16px;">Thank you for signing up with us. We're excited to have you on board!</p>
            <p style="color: #4a5568; font-size: 16px;">Feel free to explore our platform and discover all the features we offer.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.WEBSITE_URL || 'http://localhost:5001'}" style="background-color: #4299e1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
            </div>
            <p style="color: #718096; font-size: 14px; margin-top: 30px; text-align: center;">If you have any questions, please don't hesitate to contact us.</p>
        </div>
    `,
    
    signin: (name) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4a5568; text-align: center;">New Sign In</h2>
            <p style="color: #4a5568; font-size: 16px;">Hello ${name},</p>
            <p style="color: #4a5568; font-size: 16px;">We noticed a new sign-in to your account.</p>
            <p style="color: #4a5568; font-size: 16px;">If this was you, you can safely ignore this email. If you didn't sign in recently, please secure your account by changing your password.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.WEBSITE_URL || 'http://localhost:5001'}/change-password" style="background-color: #4299e1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Change Password</a>
            </div>
            <p style="color: #718096; font-size: 14px; margin-top: 30px; text-align: center;">If you have any questions, please don't hesitate to contact us.</p>
        </div>
    `,

    otp: (name, otp) => `
    <div style="font-family: Arial; max-width:600px; padding:20px;">
        <h2 style="color:#4a5568;">Hello ${name},</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#4299e1;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
    </div>
`,


    joinUs: (name) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4a5568; text-align: center;">Thank You for Joining Us!</h2>
            <p style="color: #4a5568; font-size: 16px;">Hello ${name},</p>
            <p style="color: #4a5568; font-size: 16px;">Thank you for your interest in joining our team. We've received your application and will review it shortly.</p>
            <p style="color: #4a5568; font-size: 16px;">Our team will get back to you soon with the next steps.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.WEBSITE_URL || 'http://localhost:5001'}/about-us" style="background-color: #4299e1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Learn More About Us</a>
            </div>
            <p style="color: #718096; font-size: 14px; margin-top: 30px; text-align: center;">If you have any questions, please don't hesitate to contact us.</p>
        </div>
    `,
    
    eventRegistration: (name, eventName) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4a5568; text-align: center;">Event Registration Confirmation</h2>
            <p style="color: #4a5568; font-size: 16px;">Hello ${name},</p>
            <p style="color: #4a5568; font-size: 16px;">Thank you for registering for <strong>${eventName}</strong>. Your registration has been confirmed!</p>
            <p style="color: #4a5568; font-size: 16px;">We're excited to have you participate in this event. You'll receive more details about the event schedule and requirements soon.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.WEBSITE_URL || 'http://localhost:5001'}/events" style="background-color: #4299e1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Event Details</a>
            </div>
            <p style="color: #718096; font-size: 14px; margin-top: 30px; text-align: center;">If you have any questions, please don't hesitate to contact us.</p>
        </div>
    `
};

module.exports = emailTemplates;
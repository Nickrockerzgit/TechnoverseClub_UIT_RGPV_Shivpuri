const { query } = require('../config/db');
const { sendEmail } = require('../config/email');
const emailTemplates = require('../utils/emailTemplates');

// Join us controller
const joinUs = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            collegeName,
            courseStream,
            yearOfStudy,
            skills,
            interests,
            motivation,
            githubUrl,
            linkedinUrl,
            websiteUrl,
            teamPreferences,
        } = req.body;

        // Check if the record already exists
        const checkSql = `
            SELECT * FROM join_us WHERE email = ? OR phone = ?
        `;

        const results = await query(checkSql, [email, phone]);
        
        if (results.length > 0) {
            return res.status(400).json({ error: "User with this email or phone already exists." });
        }
        
        const insertSql = `
            INSERT INTO join_us (
                full_name, 
                email, 
                phone, 
                college_name, 
                course_stream, 
                year_of_study, 
                skills, 
                interests, 
                motivation, 
                github_url, 
                linkedin_url, 
                website_url, 
                team_preferences
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await query(
            insertSql,
            [
                fullName,
                email,
                phone,
                collegeName,
                courseStream,
                yearOfStudy,
                JSON.stringify(skills),
                JSON.stringify(interests),
                motivation,
                githubUrl,
                linkedinUrl,
                websiteUrl,
                JSON.stringify(teamPreferences),
            ]
        );
        
        // Send join us confirmation email
        await sendEmail(
            email,
            "Thank You for Your Interest in Joining Us!",
            emailTemplates.joinUs(fullName)
        );
        
        res.status(200).json({ message: "Data saved successfully." });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Failed to save data to the database." });
    }
};

// Get join us data controller
const getJoinUsData = async (req, res) => {
    try {
        const results = await query("SELECT * FROM join_us");
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from join_us table" });
    }
};

module.exports = {
    joinUs,
    getJoinUsData
};
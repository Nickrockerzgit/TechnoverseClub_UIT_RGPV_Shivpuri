const { query } = require('../config/db');
const { sendEmail } = require('../config/email');
const emailTemplates = require('../utils/emailTemplates');

// Register for event controller
const registerEvent = async (req, res) => {
    try {
        const {
            teamName,
            leaderName,
            leaderEmail,
            leaderPhone,
            members,
            category,
            projectName,
            projectDescription,
            githubRepo,
            linkedinProfile
        } = req.body;

        // Get the file path if a file was uploaded
        const projectProposalPath = req.file ? `/uploads/proposals/${req.file.filename}` : null;

        // Get event name from category if possible
        let eventName = category;
        try {
            const results = await query("SELECT title FROM events WHERE categories LIKE ?", [`%${category}%`]);
            if (results.length > 0 && results[0].title) {
                eventName = results[0].title;
            }
        } catch (error) {
            console.error("Error fetching event name:", error);
        }

        // Insert into database
        const insertQuery = `
            INSERT INTO eventdata (
                team_name,
                team_leader_name,
                team_leader_email,
                team_leader_phone,
                members,
                category,
                project_name,
                project_description,
                github,
                linkedin,
                project_proposal
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await query(
            insertQuery,
            [
                teamName,
                leaderName,
                leaderEmail,
                leaderPhone,
                members, 
                category,
                projectName,
                projectDescription,
                githubRepo,
                linkedinProfile,
                projectProposalPath
            ]
        );
        
        // Send event registration confirmation email
        await sendEmail(
            leaderEmail,
            `Event Registration Confirmation: ${eventName}`,
            emailTemplates.eventRegistration(leaderName, eventName)
        );
        
        res.status(201).json({ 
            message: 'Registration successful',
            id: result.insertId
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all event registrations controller
const getRegistrations = async (req, res) => {
    try {
        const results = await query('SELECT * FROM eventdata');
        res.status(200).json(results);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch registrations' });
    }
};

module.exports = {
    registerEvent,
    getRegistrations
};
const { query } = require('../config/db');

// Add team member controller
const addTeamMember = async (req, res) => {
    try {
        console.log("Received Files:", req.files);
        console.log("Received Body:", req.body);
        
        // Delete existing team members
        await query("DELETE FROM team");

        const names = Array.isArray(req.body.name) ? req.body.name : [req.body.name];
        const roles = Array.isArray(req.body.role) ? req.body.role : [req.body.role];
        const githubs = Array.isArray(req.body.github) ? req.body.github : [req.body.github];
        const linkedins = Array.isArray(req.body.linkedin) ? req.body.linkedin : [req.body.linkedin];
        const files = req.files || [];
    
        console.log("Uploaded Files:", files);

        const values = names.map((name, index) => [
            name,
            roles[index],
            files[index] ? `/uploads/images/${files[index].filename}` : null,
            githubs[index],
            linkedins[index],
        ]);

        const sql = `
            INSERT INTO team (name, role, image, github, linkedin)
            VALUES ?
        `;

        const result = await query(sql, [values]);
        
        res.status(201).json({ 
            message: "Team members added successfully",
            count: result.affectedRows 
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get team members controller
const getTeamMembers = async (req, res) => {
    try {
        const sql = "SELECT * FROM team ORDER BY id ASC";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching team members" });
    }
};

module.exports = {
    addTeamMember,
    getTeamMembers
};
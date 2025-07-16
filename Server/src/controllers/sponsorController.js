const { query } = require('../config/db');

// Add sponsors controller
const addSponsors = async (req, res) => {
    try {
        // First, clear existing sponsors
        await query("DELETE FROM sponsors");
    
        const names = Array.isArray(req.body.name) ? req.body.name : [req.body.name];
        const websites = Array.isArray(req.body.website) ? req.body.website : [req.body.website];
        const files = req.files || [];
    
        // Ensure each sponsor gets the correct logo
        const values = names.map((name, index) => [
            name,
            files[index] ? `/uploads/logos/${files[index].filename}` : null,
            websites[index]
        ]);
    
        const sql = `
            INSERT INTO sponsors (name, logo, website)
            VALUES ?
        `;
    
        const result = await query(sql, [values]);
        
        res.status(201).json({ 
            message: "Sponsors added successfully",
            count: result.affectedRows 
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get sponsors controller
const getSponsors = async (req, res) => {
    try {
        const sql = "SELECT * FROM sponsors ORDER BY id ASC";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching sponsors" });
    }
};

module.exports = {
    addSponsors,
    getSponsors
};
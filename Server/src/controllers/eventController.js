const path = require('path');
const fs = require('fs');
const { query } = require('../config/db');

// Upload event image controller
const uploadEventImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }
        
        const imagePath = `/uploads/images/${req.file.filename}`;
        res.json({ imagePath });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Error uploading image" });
    }
};

// Update events controller
const updateEvents = async (req, res) => {
    try {
        const { events } = req.body;

        // First, clear existing events
        await query("DELETE FROM events");
        
        const values = events.map(event => [
            event.title,
            event.date,
            event.location,
            event.participants,
            event.prize_pool,
            event.entry_fee,
            event.categories,
            event.about,
            event.image,
            event.rules_guidelines,
            event.registration_start,
            event.registration_end,
            event.event_start,
            event.event_end
        ]);

        const sql = `
            INSERT INTO events (
                title, date, location, participants, 
                prize_pool, entry_fee, categories, about, image,
                rules_guidelines, registration_start, registration_end,
                event_start, event_end
            )
            VALUES ?
        `;

        const result = await query(sql, [values]);
        
        res.status(200).json({ 
            message: "Events updated successfully",
            count: result.affectedRows 
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get events controller
const getEvents = async (req, res) => {
    try {
        const sql = "SELECT * FROM events ORDER BY id ASC";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
};

// Get single event controller
const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received ID:", id);

        const sql = "SELECT * FROM events WHERE id = ?";
        const results = await query(sql, [id]);
        
        if (results.length === 0) {
            console.log("No event found for ID:", id);
            return res.status(404).json({ message: "Event not found" });
        }
        
        console.log("Fetched Event:", results[0]);
        res.status(200).json(results[0]);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching event" });
    }
};

// Delete event controller
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get the event image path before deleting
        const results = await query("SELECT image FROM events WHERE id = ?", [id]);
        const event = results[0];

        // Delete the event from database
        await query("DELETE FROM events WHERE id = ?", [id]);

        // If the event had an uploaded image, delete it from the uploads folder
        if (event && event.image && event.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '../../', event.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Error deleting event" });
    }
};

module.exports = {
    uploadEventImage,
    updateEvents,
    getEvents,
    getEvent,
    deleteEvent
};
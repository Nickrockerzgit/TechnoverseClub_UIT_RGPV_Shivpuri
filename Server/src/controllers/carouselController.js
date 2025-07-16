const path = require('path');
const fs = require('fs');
const { query } = require('../config/db');

// Upload slides controller
const uploadSlide = async (req, res) => {
    try {
        const slides = JSON.parse(req.body.slides);
        const files = req.files;

        if (!slides || !files || slides.length !== 3 || files.length !== 3) {
            return res.status(400).json({ message: "Please provide exactly 3 slides with images" });
        }

        // Retrieve existing images
        const results = await query("SELECT image FROM carouseltable");
        
        // Store old image paths
        const oldImagePaths = results.map(slide => path.join(__dirname, '../../', slide.image));

        // Delete all records first
        await query("DELETE FROM carouseltable");

        // Insert new slides
        const values = slides.map((slide, index) => [
            slide.title,
            slide.description,
            `/uploads/images/${files[index].filename}`
        ]);

        const sql = "INSERT INTO carouseltable (title, description, image) VALUES ?";
        
        await query(sql, [values]);

        // Delete old images from server only if DB insertion is successful
        oldImagePaths.forEach(imagePath => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });

        res.status(201).json({ message: "Slides uploaded successfully" });
    } catch (error) {
        console.error("Upload Server Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get slides controller
const getSlides = async (req, res) => {
    try {
        const sql = "SELECT * FROM carouseltable ORDER BY id DESC LIMIT 3";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error("Fetch Error: ", error);
        res.status(500).json({ message: "Error fetching slides" });
    }
};

module.exports = {
    uploadSlide,
    getSlides
};
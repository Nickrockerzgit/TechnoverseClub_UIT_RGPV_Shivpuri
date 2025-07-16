const { getVideoDurationInSeconds } = require('get-video-duration');
const { query } = require('../config/db');

// Upload vlog controller
const uploadVlog = async (req, res) => {
    try {
        const { title } = req.body;
        const files = req.files;
    
        if (!files.video || !files.thumbnail) {
            return res.status(400).json({ message: "Both video and thumbnail are required" });
        }
    
        const videoPath = `/uploads/videos/${files.video[0].filename}`;
        const thumbnailPath = `/uploads/thumbnails/${files.thumbnail[0].filename}`;
        const duration = await getVideoDurationInSeconds(files.video[0].path);
        const formattedDuration = new Date(duration * 1000).toISOString().substr(14, 5);
    
        // Always insert as a new row
        const sql = `INSERT INTO vlogs (title, video_url, thumbnail_url, duration, views, likes) 
                     VALUES (?, ?, ?, ?, 0, 0)`;
        
        const values = [title, videoPath, thumbnailPath, formattedDuration];
    
        const result = await query(sql, values);
        
        res.status(201).json({ 
            message: "Vlog uploaded successfully",
            id: result.insertId 
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get vlogs controller
const getVlogs = async (req, res) => {
    try {
        const sql = "SELECT * FROM vlogs ORDER BY created_at DESC";
        const results = await query(sql);
        res.status(200).json(results);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Error fetching vlogs" });
    }
};

// Increment views controller
const incrementViews = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "UPDATE vlogs SET views = views + 1 WHERE id = ?";
        await query(sql, [id]);
        res.status(200).json({ message: "Views updated successfully" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating views" });
    }
};

// Like vlog controller
const likeVlog = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "UPDATE vlogs SET likes = likes + 1 WHERE id = ?";
        await query(sql, [id]);
        res.status(200).json({ message: "Likes updated successfully" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating likes" });
    }
};

module.exports = {
    uploadVlog,
    getVlogs,
    incrementViews,
    likeVlog
};
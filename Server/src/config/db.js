const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Create connection pool
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

// Connect to database
const connectToDatabase = () => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("❌ Database Connection Failed: ", err);
                return;
            }
            console.log("✅ Connected to MySQL Database");
            connection.release();
        });
    } catch (error) {
        console.error("❌ Database Connection Error: ", error);
    }
};

// Query helper function
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

module.exports = {
    pool,
    promisePool,
    connectToDatabase,
    query
};
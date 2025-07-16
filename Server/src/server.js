// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');
// const dotenv = require('dotenv');

// // Initialize environment variables
// dotenv.config();

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const carouselRoutes = require('./routes/carouselRoutes');
// const teamRoutes = require('./routes/teamRoutes');
// const sponsorRoutes = require('./routes/sponsorRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const joinUsRoutes = require('./routes/joinUsRoutes');
// const vlogRoutes = require('./routes/vlogRoutes');

// // Import database connection
// const { connectToDatabase } = require('./config/db');

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Create upload directories if they don't exist
// const uploadDirs = ['uploads', 'uploads/images', 'uploads/proposals', 'uploads/videos', 'uploads/thumbnails', 'uploads/logos'];
// uploadDirs.forEach(dir => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// });

// // Serve static files
// app.use('/uploads', express.static('uploads'));
// app.use('/uploads/proposals', express.static('uploads/proposals'));
// app.use('/uploads/images', express.static('uploads/images'));
// app.use('/uploads/logos', express.static('uploads/logos'));
// app.use('/uploads/videos', express.static('uploads/videos'));
// app.use('/uploads/thumbnails', express.static('uploads/thumbnails'));

// // Connect to database
// connectToDatabase();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/carousel', carouselRoutes);
// app.use('/api/team', teamRoutes);
// app.use('/api/sponsors', sponsorRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/join-us', joinUsRoutes);
// app.use('/api/vlogs', vlogRoutes);

// // Base route
// app.get('/', (req, res) => {
//     res.send('TechnoVerse API Server is running');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });











const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
// const helmet = require('helmet'); 

// Initialize environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const carouselRoutes = require('./routes/carouselRoutes');
const teamRoutes = require('./routes/teamRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const eventRoutes = require('./routes/eventRoutes');
const joinUsRoutes = require('./routes/joinUsRoutes');
const vlogRoutes = require('./routes/vlogRoutes');
const chatRoutes = require("./routes/chatRoutes");//..........................
const resumeAIRoutes = require("./routes/resumeAIRoutes");//..........................
const quizRoutes  = require("./routes/quizRoutes");//..........................


// Import database connection
const { connectToDatabase } = require('./config/db');

// Initialize Express app
const app = express();

// ✅ Use Helmet for basic security headers
// app.use(helmet());

// ✅ Optional: Customize Helmet (advanced usage)
// app.use(helmet({
//   contentSecurityPolicy: false, // If you want to handle CSP manually
// }));
 
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create upload directories if they don't exist
const uploadDirs = [
  'uploads', 
  'uploads/images', 
  'uploads/proposals', 
  'uploads/videos', 
  'uploads/thumbnails', 
  'uploads/logos'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/uploads/proposals', express.static('uploads/proposals'));
app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/logos', express.static('uploads/logos'));
app.use('/uploads/videos', express.static('uploads/videos'));
app.use('/uploads/thumbnails', express.static('uploads/thumbnails'));

// Connect to database
connectToDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/join-us', joinUsRoutes);
app.use('/api/vlogs', vlogRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/", resumeAIRoutes);
app.use('/api/quiz', quizRoutes);


// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'TechnoVerse API Server is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      carousel: '/api/carousel',
      team: '/api/team',
      sponsors: '/api/sponsors',
      events: '/api/events',
      joinUs: '/api/join-us',
      vlogs: '/api/vlogs',
      chats : '/api/chatbot',
      resume : '/api/resume',
      quize : '/api/quize',
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
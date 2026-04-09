const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const teamRoutes = require('./routes/teamRoutes');
const agendaRoutes = require('./routes/agendaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/agenda', agendaRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Carbo°RESET API is running...');
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

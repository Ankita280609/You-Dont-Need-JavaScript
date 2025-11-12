const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// --- Middleware ---
// Enable CORS for all routes
app.use(cors()); 
// Parse JSON request bodies
app.use(express.json()); 

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// --- API Routes ---
app.get('/api', (req, res) => {
  res.send('BILLA API Running');
});

// Define auth routes
app.use('/api/auth', require('./routes/auth'));
// Define subscription routes
app.use('/api/subscriptions', require('./routes/subscriptions'));
// Define analytics routes
app.use('/api/analytics', require('./routes/analytics')); 
// Define notification routes
app.use('/api/notify', require('./routes/notify'));

// --- Server Startup ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
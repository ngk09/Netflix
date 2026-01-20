const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Optimized CORS for production
app.use(cors({
  origin: '*', 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/** * Optimized MongoDB Connection for Vercel Serverless
 * Reuses the connection to avoid "Connection Storming" 
 */
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  // Handle initial connection errors
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Recommended for serverless to fail fast
    });
    cachedConnection = db;
    console.log("✅ New MongoDB Connection Established");
    return db;
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    throw err;
  }
};

// Middleware to ensure DB is connected before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// User Model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// SIGNUP ROUTE
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ success: true, message: "User Created" });
  } catch (err) {
    res.status(400).json({ success: false, message: "User already exists or invalid data" });
  }
});

// LOGIN ROUTE
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ 
      $or: [{ username: username }, { email: username }] 
    });

    if (user && user.password === password) {
      return res.json({ 
        success: true, 
        user: { username: user.username, email: user.email } 
      });
    }
    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/** * VERCEL EXPORT
 * Exporting the app allows Vercel to handle it as a Serverless Function.
 */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local Server running on port ${PORT}`));
}

module.exports = app;
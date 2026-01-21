const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

// Optimized CORS for Vercel
app.use(cors({
  origin: '*', 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/** * Optimized MongoDB Connection for Vercel Serverless
 * Reuses the connection to avoid "Connection Storming" 
 */
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ New MongoDB Connection Established");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    throw err;
  }
};

// Middleware to ensure DB connection before processing requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// User Model (Must match your app's requirements)
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// --- SECURE AUTH ROUTES ---

// SIGNUP ROUTE (With Bcrypt Hashing)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ success: true, message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// LOGIN ROUTE (With Bcrypt Comparison)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body; // username can be email or username
  try {
    const user = await User.findOne({ 
      $or: [{ username: username }, { email: username }] 
    });

    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Generate JWT Token
    const accessToken = jwt.sign(
      { id: user._id }, 
      process.env.SECRET_KEY || 'your_secret_key', 
      { expiresIn: "5d" }
    );
    
    res.json({ 
      success: true, 
      user: { username: user.username, email: user.email },
      accessToken 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

/** * VERCEL EXPORT
 * Exporting allows Vercel to treat this as a single Vercel Function.
 */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local Server running on port ${PORT}`));
}

module.exports = app;
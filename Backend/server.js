const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Critical for fixing AxiosErrors

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ DB Connection Error:", err));

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
    res.status(400).json({ success: false, message: "User already exists" });
  }
});

// LOGIN ROUTE (Plain Text Comparison)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username} / ${password}`);

  try {
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      console.log("✅ Success: Credentials match");
      return res.json({ 
        success: true, 
        user: { username: user.username, email: user.email } 
      });
    }

    console.log("❌ Failed: Credentials do not match");
    res.status(401).json({ success: false, message: "Invalid Username or Password" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
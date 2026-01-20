const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGN UP
router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({ email: req.body.email, password: hashedPassword });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) { res.status(500).json(err); }
});

// SIGN IN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong password or email!");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).json("Wrong password or email!");

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "5d" });
    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;
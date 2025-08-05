// backend/routes/userRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from './user.js';

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const userWithPrakriti = await User.findById(newUser._id).select('-password');

    res.status(201).json({
      user: userWithPrakriti,
      token,
    });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route POST /api/users/login
// @desc Authenticate user and get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Fetch the user again to ensure all fields, including 'prakriti', are included.
    const userWithPrakriti = await User.findById(user._id).select('-password');

    res.json({
      user: userWithPrakriti,
      token,
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route PUT /api/users/profile
// @desc Update user profile (used to save prakriti analysis)
router.put('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
});

export default router;
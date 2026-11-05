import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const JWT_SECRET = 'mednexa_super_secret_key_2026';
const googleClient = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com');

// 1. MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mednexa')
.then(() => {
  console.log('🟢 MongoDB Connected: mednexa DB');
}).catch(err => console.error('MongoDB connection error:', err));

// 2. Mongoose Schemas & Models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  googleId: String,
  role: { type: String, default: 'patient' },
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// In-Memory OTP Store for Testing
const otpStore = {};

// 3. Authentication Endpoints

// Standard Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, isVerified: true });

    res.json({ success: true, message: 'Account created successfully!', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Standard Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password.' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { contact } = req.body;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[contact] = generatedOtp;

    res.json({ success: true, message: 'OTP sent successfully', devOtp: generatedOtp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { contact, otp } = req.body;
    if (otpStore[contact] && otpStore[contact] === otp) {
      delete otpStore[contact];

      let user = await User.findOne({ email: contact });
      if (!user) {
        user = await User.create({
          name: contact.split('@')[0] || 'User',
          email: contact,
          password: await bcrypt.hash(Math.random().toString(), 10),
          isVerified: true
        });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Google Token Verification Login (Supports Mock Local Fallback)
app.post('/api/auth/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    let email, name, googleId;

    if (!token || token.includes('YOUR_GOOGLE_CLIENT_ID') || token.startsWith('mock-token')) {
      email = 'keerthimalasani90@gmail.com';
      name = 'Keerthi Malasani';
      googleId = 'mock-google-id-12345';
    } else {
      const ticket = await googleClient.verifyIdToken({
          idToken: token,
          audience: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      googleId = payload.sub;
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        password: await bcrypt.hash(Math.random().toString(), 10),
        isVerified: true
      });
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token: jwtToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Google authentication failed: ' + err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 MedNexa Backend running on port ${PORT}`);
});
// Add Appointment Schema to Mongoose models
const appointmentSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  doctorName: String,
  department: String,
  date: String,
  time: String,
  status: { type: String, default: 'Confirmed' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Appointment Booking Endpoint
app.post('/api/appointments/book', async (req, res) => {
  try {
    const { patientName, patientEmail, doctorName, department, date, time } = req.body;
    
    const newAppointment = await Appointment.create({
      patientName,
      patientEmail,
      doctorName,
      department,
      date,
      time
    });

    res.json({ success: true, message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
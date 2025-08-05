// models/User.js
import mongoose from 'mongoose';

const prakritiSchema = new mongoose.Schema({
  primaryDosha: { type: String, required: true },
  secondaryDosha: String,
  description: String,
  diet: Object,
  routine: [String],
  followUps: [String],
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  prakriti: prakritiSchema,
});

const User = mongoose.model('User', userSchema);
export default User;
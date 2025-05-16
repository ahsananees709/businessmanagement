import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },

}, { timestamps: true });

export default mongoose.model('User', userSchema);

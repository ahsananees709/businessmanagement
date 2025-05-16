import mongoose from 'mongoose';
import { DATABASE_URL } from '../src/utils/constants.js';

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

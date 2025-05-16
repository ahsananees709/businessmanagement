import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    maxlength: 255,
  },
  expire_time: {
    type: Number,
  },
}, { timestamps: true });

export default mongoose.model('BlacklistToken', blacklistTokenSchema);

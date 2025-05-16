import mongoose from 'mongoose';

const businessMemberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessRole', required: true },
  }, { timestamps: true });
  
export default mongoose.model('BusinessMember', businessMemberSchema);

  
  
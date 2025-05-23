import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessMember', required: true },

}, { timestamps: true });

export default mongoose.model('Team', teamSchema);


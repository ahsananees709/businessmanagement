import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, 
    description: {type: String, default: ''},
    logo: { type: String, default: '' },
    banner: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, { timestamps: true });

export default mongoose.model('Business', businessSchema);

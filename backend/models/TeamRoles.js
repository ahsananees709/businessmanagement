import mongoose from 'mongoose';

const teamRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['team_lead', 'team_member'],
        required: true
    }
}, { timestamps: true });

export default mongoose.model('TeamRole', teamRoleSchema);

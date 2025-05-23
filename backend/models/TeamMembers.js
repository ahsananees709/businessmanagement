import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    businessMember: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessMember', required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamRole', required: true },
    workingAs: { type: String, default: 'Team Member' },
  
}, { timestamps: true });


export default mongoose.model('TeamMember', teamMemberSchema);


  
  
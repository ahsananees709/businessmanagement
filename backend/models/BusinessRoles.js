import mongoose from 'mongoose';

const businessRoleSchema = new mongoose.Schema({
    name: {
      type: String,
      enum: ['super_admin', 'admin', 'client', 'employee'],
      required: true
    }
  }, { timestamps: true });
  
export default mongoose.model('BusinessRole', businessRoleSchema);


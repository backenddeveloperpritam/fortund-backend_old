import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true // Ensures each skill name is unique
  }
},{ collection: 'Roles', timestamps: true });

const Roles = mongoose.model('Roles', roleSchema);

export default Roles;

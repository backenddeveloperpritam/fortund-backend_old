import mongoose from 'mongoose';

const expertiseSchema = new mongoose.Schema({
  expertise: {
    type: String,
    required: true,
    unique: true
  }
}, { collection: 'Expertise', timestamps: true });

const Expertise = mongoose.model('Expertise', expertiseSchema);

export default Expertise;

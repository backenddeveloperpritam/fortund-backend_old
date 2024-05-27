import mongoose from 'mongoose';

const mainExpertiseSchema = new mongoose.Schema({
  mainExpertise: {
    type: String,
    required: true,
    unique: true // Ensures each mainExpertise name is unique
  }
},{ collection: 'MainExpertise', timestamps: true });

const MainExpertise = mongoose.model('MainExpertise', mainExpertiseSchema);

export default MainExpertise;

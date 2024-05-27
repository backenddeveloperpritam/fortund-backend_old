import mongoose from 'mongoose';

const termsAndconditionSchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 5000
  }
}, { collection: 'TandC', timestamps: true });

const TandC = mongoose.model('TandC', termsAndconditionSchema);

export default TandC;

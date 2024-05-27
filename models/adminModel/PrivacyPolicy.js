import mongoose from 'mongoose';

const privacyPolicySchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 5000
  }
},{ collection: 'PrivacyPolicy', timestamps: true });

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

export default PrivacyPolicy;

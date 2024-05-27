import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 5000
  }
}, { collection: 'Faq', timestamps: true });

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;

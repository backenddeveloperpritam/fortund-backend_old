import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  redirectionUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  bannerFor: {
    type: String,
    default: 'app'
  },
  redirectTo: {
    type: String
  },
  bannerImage: {
    type: String
  }
}, { collection: 'Banners', timestamps: true });

const Banners = mongoose.model('Banners', bannerSchema);

export default Banners;

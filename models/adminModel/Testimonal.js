import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  description: String,

  rating: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum:['Active',"InActive"]
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { collection: 'Testimonial', timestamps: true });

// Middleware to filter out soft deleted documents
testimonialSchema.pre('find', function () {
  this.where({ deleted: false });
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;

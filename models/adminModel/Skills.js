import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'InActive'],
    default: 'Active'
  },
  isDeleted: {
    type: Number,
    default: 0,
  },
}, {
  collection: 'Skills',
  timestamps: true
});

// Pre-save hook to capitalize the first character of the title
skillSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('title')) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  next();
});

skillSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: 1 } });
});

const Skills = mongoose.model('Skills', skillSchema);

export default Skills;

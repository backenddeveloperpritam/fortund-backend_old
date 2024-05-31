import mongoose from 'mongoose';

const expertiseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
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
}, { collection: 'Expertise', timestamps: true });

expertiseSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('title')) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  next();
});

const excludeDeletedRecords = function (next) {
  this.where({ isDeleted: { $ne: 1 } });
  next();
};

expertiseSchema.pre('find', excludeDeletedRecords);
expertiseSchema.pre('findOne', excludeDeletedRecords);
expertiseSchema.pre('findOneAndUpdate', excludeDeletedRecords);
expertiseSchema.pre('count', excludeDeletedRecords);
expertiseSchema.pre('countDocuments', excludeDeletedRecords);


const Expertise = mongoose.model('Expertise', expertiseSchema);

export default Expertise;

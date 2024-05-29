import mongoose from 'mongoose';

const subSkillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skills',
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'InActive'],
    default: "Active",
  },
  isDeleted: {
    type: Number,
    default: 0,
  },
}, { collection: 'SubSkills', timestamps: true });

subSkillSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: 1 } });
});

subSkillSchema.pre('findOne', function () {
  this.where({ isDeleted: { $ne: 1 } });
});

const SubSkills = mongoose.model('SubSkills', subSkillSchema);

export default SubSkills;

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const poojaCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'InActive'],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'PoojaCategory', timestamps: true }
);

poojaCategorySchema.pre('find', function () {
  this.where({ deleted: false });
});

const PoojaCategory = model('PoojaCategory', poojaCategorySchema);

export default PoojaCategory;

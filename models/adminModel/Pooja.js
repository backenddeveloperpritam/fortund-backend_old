import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const poojaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    poojaCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
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
  { collection: 'Pooja', timestamps: true }
);

poojaSchema.pre('find', function () {
  this.where({ deleted: false });
});

const Pooja = model('Pooja', poojaSchema);

export default Pooja;

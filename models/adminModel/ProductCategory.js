import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
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
  { collection: 'ProductCategory', timestamps: true }
);

productCategorySchema.pre('find', function () {
  this.where({ deleted: false });
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

export default ProductCategory;

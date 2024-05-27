import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productCategory: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    galleryImage: [{ type: String, required: true }],

    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
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
  { collection: 'Product', timestamps: true }
);

productSchema.pre('find', function () {
  this.where({ deleted: false });
});

const Product = mongoose.model('Product', productSchema);

export default Product;

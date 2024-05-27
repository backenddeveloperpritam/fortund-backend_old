import mongoose from 'mongoose';

const blogsCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "InActive"]
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, collection: 'BlogsCategory' }
);

blogsCategorySchema.pre('find', function () {
  this.where({ deleted: false });
});

const BlogsCategory = mongoose.model('BlogsCategory', blogsCategorySchema);

export default BlogsCategory;

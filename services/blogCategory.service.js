import ApiError from "../utils/ApiError.js";
import BlogsCategory from "../models/adminModel/BlogsCategory.js";

const getBlogCategory = async () => {
    const blogCategory = await BlogsCategory.find({});

    return blogCategory;
};

const getBlogCategoryById = async (id) => {
    const blogCagegory = BlogsCategory.findOne({ _id: id });
    return blogCagegory;
}

const addNewBlogCategory = async (title, status) => {
    const video = await BlogsCategory.create({
        title,
        status
    });

    return video;
}

const deleteBlogCategory = async (blogCategoryId) => {
    const updatedBlogCategory = await BlogsCategory.findByIdAndUpdate(
        blogCategoryId,
        { isDeleted: 1 },
        { new: true }
    );

    return updatedBlogCategory;
};

export { getBlogCategory, getBlogCategoryById, addNewBlogCategory, deleteBlogCategory };

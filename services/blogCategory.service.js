import ApiError from "../utils/ApiError.js";
import BlogsCategory from "../models/adminModel/BlogsCategory.js";

const getBlogCategory = async (title = '', sortBy = '') => {
    try {
        console.log("title", title)
        const titleMatch = { "title": { "$regex": title, "$options": "i" } };

        const blogCagegory = await BlogsCategory.find({
            ...titleMatch,
        });

        if (!blogCagegory || blogCagegory.length === 0) {
            throw new ApiError(404, "No blog category found");
        }

        if (!sortBy) {
            return blogCagegory;
        } else {
            return sortVideos(blogCagegory, sortBy);
        }
    } catch (error) {
        throw new ApiError(500, "Internal Server Error Blog Category Not Fetch");
    }
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

export { getBlogCategory, getBlogCategoryById, addNewBlogCategory };

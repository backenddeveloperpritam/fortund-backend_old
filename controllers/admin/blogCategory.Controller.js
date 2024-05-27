import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as categoryService from '../../services/blogCategory.service.js';
import httpStatus from 'http-status';

const categoryBlogList = asyncHandler(async (req, res) => {
    try {
        const title = req.query.title ? req.query.title : "";

        const result = await categoryService.getBlogCategory(title);

        if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, "No Category found with matching id");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, result, "Category fetch successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong Category not fetch");
    }
});

const getBlogCategoryById = asyncHandler(async (req, res) => {
    try {

        const result = await categoryService.getBlogCategoryById(req.params.blogCategoryId);
        if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, "No blogCagegory found with matching id");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, result, "blogCagegory fetch successfully")
            )

    } catch (error) {
        throw new ApiError(500, "Something went wrong fetch Category By id");

    }
});

const addBlogCategory = asyncHandler(async (req, res) => {
    try {
        const { title, status } = req.body;
        // Create a new instance of the BlogsCategory model with the provided blog category
        const result = await categoryService.addNewBlogCategory(title, status);

        return res
            .status(200)
            .json({ success: true, result, message: "Blog category added successfully" });
    } catch (error) {
        throw new ApiError(500, "Something went wrong fetch Category By id");
    }
});

const updateBlogCategoryById = asyncHandler(async (req, res) => {
    try {
        const { title, status } = req.body;
        // Create a new instance of the BlogsCategory model with the provided blog category
        const result = await categoryService.addNewBlogCategory(title, status);

        return res
            .status(200)
            .json({ success: true, result, message: "Blog category added successfully" });
    } catch (error) {
        throw new ApiError(500, "Something went wrong fetch Category By id");
    }
});

export { categoryBlogList, getBlogCategoryById, addBlogCategory, updateBlogCategoryById };

import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as categoryService from '../../services/blogCategory.service.js';
import httpStatus from 'http-status';

const categoryBlogList = asyncHandler(async (req, res) => {
    const result = await categoryService.getBlogCategory();

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Category found with matching id");
    }

    return res.status(200).json(new ApiResponse(200, result, "Category fetched successfully"));
});

const getBlogCategoryById = asyncHandler(async (req, res) => {


    const result = await categoryService.getBlogCategoryById(req.params.blogCategoryId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No blogCagegory found with matching id");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "blogCagegory fetch successfully")
        )


});

const addBlogCategory = asyncHandler(async (req, res) => {
    const { title, status } = req.body;
    const result = await categoryService.addNewBlogCategory(title, status);

    return res
        .status(200)
        .json({ success: true, result, message: "Blog category added successfully" });

});

const updateBlogCategoryById = asyncHandler(async (req, res) => {
    const { title, status } = req.body;
    const result = await categoryService.addNewBlogCategory(title, status);

    return res
        .status(200)
        .json({ success: true, result, message: "Blog category added successfully" });

});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { blogCategoryId } = req.body;
    const result = await categoryService.deleteBlogCategory(blogCategoryId);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Blog Category found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Blog Category delleted successfully"));
})

export { categoryBlogList, getBlogCategoryById, addBlogCategory, updateBlogCategoryById, deleteBlogCategory };

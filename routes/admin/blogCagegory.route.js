import express from 'express';
import validate from "../../middlewares/validate.js";
import * as blogCategoryValidation from '../../validations/blogCategory.validation.js';
import * as blogCategoryController from '../../controllers/admin/blogCategory.Controller.js';

const router = express.Router();

router.get(
    "/blog-category-list",
    validate(blogCategoryValidation.searchBlogCategory),
    blogCategoryController.categoryBlogList
);

router.get(
    "/blog-category/:blogCategoryId",
    validate(blogCategoryValidation.getblogCategoryId),
    blogCategoryController.getBlogCategoryById
);

router.post("/add-blog-category", validate(blogCategoryValidation.addNewBlogCategory), blogCategoryController.addBlogCategory);

router.post("/update-blog-category", validate(blogCategoryValidation.updateBlogCategory), blogCategoryController.updateBlogCategoryById);

export default router;

import express from 'express';
import validate from "../../middlewares/validate.js";
import * as blogCategoryValidation from '../../validations/blogCategory.validation.js';
import * as blogCategoryController from '../../controllers/admin/blogCategory.controller.js';

const router = express.Router();

router.get(
    "/blog-category-list",
    blogCategoryController.categoryBlogList
);

router.get(
    "/blog-category/:blogCategoryId",
    validate(blogCategoryValidation.getblogCategoryId),
    blogCategoryController.getBlogCategoryById
);

router.post("/add-blog-category",
    validate(blogCategoryValidation.addNewBlogCategory),
    blogCategoryController.addBlogCategory
);

router.post("/blog-category/update/:blogCategoryId",
    validate(blogCategoryValidation.updateBlogCategory),
    blogCategoryController.updateBlogCategoryById
);

router.post("/blog-category/delete",
    validate(blogCategoryValidation.deleteBlogCategory),
    blogCategoryController.deleteBlogCategory
);


export default router;

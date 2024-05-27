import express from 'express';
const router = express.Router();
import * as webController from '../controllers/webController.js';
//blogs
router.get("/blogs", webController.getAllBlogs);


router.get("/testimonials", webController.getAllTestimonials);

export default router

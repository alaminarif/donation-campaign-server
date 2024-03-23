import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
const router = express.Router();

router.post(
  '/create-Blog',
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogController.createBlog
);

router.get('/', BlogController.getAllBlog);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updatedBlogZodSchema),
  BlogController.updateBlog
);
router.get('/:id', BlogController.getSingleBlog);
router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;

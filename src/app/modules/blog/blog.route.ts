import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();

router.post(
  '/create-Blog',
  validateRequest(BlogValidation.createBlogZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BlogController.createBlog
);

router.get('/', BlogController.getAllBlog);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updatedBlogZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BlogController.updateBlog
);

router.get(
  '/my-blog',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BlogController.getMyBlog
);

router.get('/:id', BlogController.getSingleBlog);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BlogController.deleteBlog);

export const BlogRoutes = router;

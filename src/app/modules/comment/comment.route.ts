import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CommentController } from './comment.controller';
import { CommentValidation } from './comment.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-Comment',
  validateRequest(CommentValidation.createCommentZodSchema),
  // auth(ENUM_USER_ROLE.USER),
  CommentController.createComment
);

router.get('/', CommentController.getAllComment);

router.get(
  '/my-comment',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  CommentController.getMyComment
);

router.patch(
  '/my-comment',
  validateRequest(CommentValidation.updateCommentZodSchema),
  auth(ENUM_USER_ROLE.USER),
  CommentController.updateComment
);

router.delete('/:id', CommentController.deleteComment);

router.patch('/my-comment', CommentController.updateComment);

export const CommentRoutes = router;

import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';

import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get('/', UserController.getAllUser);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER),
  UserController.getMyProfile
);
router.patch(
  '/my-profile',
  validateRequest(UserValidation.updateProfileZodSchema),
  auth(ENUM_USER_ROLE.USER),
  UserController.updateProfile
);

router.delete('/:id', UserController.deleteUser);

router.patch('/my-profile', UserController.updateProfile);
export const UserRoutes = router;

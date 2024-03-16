import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';

import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.get('/', UserController.getAllUser);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER),
  UserController.getMyProfile
);

export const UserRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  // auth(ENUM_USER_ROLE.USER),
  AuthController.createUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.USER),
  AuthController.changePassword
);

export const AuthRoutes = router;

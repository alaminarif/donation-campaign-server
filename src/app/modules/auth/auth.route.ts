import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

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
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.volunteer,
    USER_ROLE.donor,
    USER_ROLE.guest,
    USER_ROLE.manager
  ),
  AuthController.changePassword
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.volunteer,
    USER_ROLE.donor,
    USER_ROLE.guest,
    USER_ROLE.manager
  ),
  AuthController.forgetPassword
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  // auth(ENUM_USER_ROLE.USER),
  AuthController.resetPassword
);

export const AuthRoutes = router;

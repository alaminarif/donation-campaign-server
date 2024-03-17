import express from 'express';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AuthValidation } from '../auth/auth.validation';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  AdminController.loginAdmin
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  AdminController.refreshToken
);
export const AdminRoutes = router;

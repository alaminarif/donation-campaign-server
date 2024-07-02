import express from 'express';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AuthValidation } from '../auth/auth.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// router.post(
//   '/create-admin',
//   validateRequest(AdminValidation.createAdminZodSchema),
//   // auth(ENUM_USER_ROLE.ADMIN),
//   AdminController.createAdmin
// );

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

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.changePassword
);

router.get('/', AdminController.getAllAdmin);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getMyProfile
);
router.patch(
  '/my-profile',
  validateRequest(AdminValidation.updateProfileZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateProfile
);

router.delete('/:id', AdminController.deleteAdminFromDB);

router.patch('/my-profile', AdminController.updateProfile);
export const AdminRoutes = router;

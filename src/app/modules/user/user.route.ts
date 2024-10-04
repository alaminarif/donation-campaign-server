import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';

import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from './user.validation';
import { AdminValidation } from '../admin/admin.validation';
import { ManagerValidation } from '../manager/manager.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

router.post(
  '/create-manager',
  validateRequest(ManagerValidation.createManagerValidationSchema),
  UserController.createManager
);

// router.get('/', UserController.getAllUser);

router.get(
  '/me',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getMe
);

export const UserRoutes = router;

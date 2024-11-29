import express from 'express';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.super_admin), AdminController.getAllAdmin);

router.get('/:id', auth(USER_ROLE.super_admin), AdminController.getSingleAdmin);

router.patch(
  '/:email',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  auth(USER_ROLE.super_admin),
  AdminController.updateAdmin
);

router.delete(
  '/:email',
  auth(USER_ROLE.super_admin),
  AdminController.deleteAdmin
);

export const AdminRoutes = router;

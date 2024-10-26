import express from 'express';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);

router.get(
  '/:email',
  // auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdmin
);

router.patch(
  '/:email',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdmin
);

router.delete('/:email', AdminController.deleteAdmin);

// router.patch('/my-profile', AdminController.updateProfile);
export const AdminRoutes = router;

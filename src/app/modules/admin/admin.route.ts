import express from 'express';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.get('/my-profile', auth(ENUM_USER_ROLE.ADMIN), AdminController.getMe);
router.patch(
  '/my-profile',
  validateRequest(AdminValidation.updateProfileZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateProfile
);

router.delete('/:email', AdminController.deleteAdmin);

router.patch('/my-profile', AdminController.updateProfile);
export const AdminRoutes = router;

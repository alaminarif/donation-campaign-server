import express from 'express';
import { ManagerValidation } from './manager.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ManagerController } from './manager.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', ManagerController.getAllManager);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.MANAGER),
  ManagerController.getMe
);
router.patch(
  '/my-profile',
  validateRequest(ManagerValidation.updateProfileZodSchema),
  auth(ENUM_USER_ROLE.MANAGER),
  ManagerController.updateProfile
);

router.delete('/:email', ManagerController.deleteManager);

router.patch('/my-profile', ManagerController.updateProfile);
export const ManagerRoutes = router;

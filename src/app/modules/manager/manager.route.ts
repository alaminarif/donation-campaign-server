import express from 'express';
import { ManagerValidation } from './manager.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ManagerController } from './manager.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin, USER_ROLE.super_admin),
  ManagerController.getAllManager
);

router.get(
  '/:email',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  ManagerController.getSingleManager
);

router.patch(
  '/:email',
  validateRequest(ManagerValidation.updateManagerValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  ManagerController.updateManager
);

router.delete(
  '/:email',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  ManagerController.deleteManager
);

export const ManagerRoutes = router;

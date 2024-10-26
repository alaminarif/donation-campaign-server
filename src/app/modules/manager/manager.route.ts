import express from 'express';
import { ManagerValidation } from './manager.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ManagerController } from './manager.controller';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', ManagerController.getAllManager);

router.get(
  '/:email',
  // auth(ENUM_USER_ROLE.ADMIN),
  ManagerController.getSingleManager
);

router.patch(
  '/:email',
  validateRequest(ManagerValidation.updateManagerValidationSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  ManagerController.updateManager
);

router.delete('/:email', ManagerController.deleteManager);

export const ManagerRoutes = router;

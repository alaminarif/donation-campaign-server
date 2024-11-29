import express from 'express';
import { DonorController } from './donor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DonorValidation } from './donor.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.donor, USER_ROLE.admin, USER_ROLE.super_admin),
  DonorController.getAllDonor
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  DonorController.getSingleDonor
);

router.patch(
  '/:email',
  validateRequest(DonorValidation.updateDonorValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  DonorController.updateDonor
);

router.delete(
  '/:email',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  DonorController.deleteDonor
);

export const DonorRoutes = router;

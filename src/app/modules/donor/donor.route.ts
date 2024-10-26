import express from 'express';
import { DonorController } from './donor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DonorValidation } from './donor.validation';
const router = express.Router();

router.get('/', DonorController.getAllDonor);

router.get(
  '/:email',
  // auth(ENUM_USER_ROLE.ADMIN),
  DonorController.getSingleDonor
);

router.patch(
  '/:email',
  validateRequest(DonorValidation.updateDonorValidationSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  DonorController.updateDonor
);

router.delete('/:email', DonorController.deleteDonor);

export const DonorRoutes = router;

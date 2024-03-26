import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DonationValidation } from './donation.validation';
import { DonationController } from './donation.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-donation',
  validateRequest(DonationValidation.createDonationZodSchema),
  auth(ENUM_USER_ROLE.USER),
  DonationController.createDonation
);

router.get('/', DonationController.getAllDonation);

router.get('/:id', DonationController.getSingleDonation);

router.patch(
  '/update-donation',
  validateRequest(DonationValidation.updateDonationZodSchema),
  auth(ENUM_USER_ROLE.USER),
  DonationController.updateDonation
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DonationController.deleteDonation
);

export const DonationRoutes = router;

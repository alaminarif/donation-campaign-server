import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DonationValidation } from './donation.validation';
import { DonationController } from './donation.controller';

const router = express.Router();

router.post(
  '/create-donation',
  validateRequest(DonationValidation.createDonationZodSchema),
  DonationController.createDonation
);

router.get('/', DonationController.getAllDonation);

router.get('/:id', DonationController.getSingleDonation);
router.patch(
  '/:id',
  validateRequest(DonationValidation.updateDonationZodSchema),
  DonationController.updateDonation
);
router.delete('/:id', DonationController.deleteDonation);

export const DonationRoutes = router;

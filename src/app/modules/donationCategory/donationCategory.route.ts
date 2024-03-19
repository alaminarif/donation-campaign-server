import express from 'express';
import { DonationCategoryController } from './donationCategory.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DonationCategoryValidation } from './donationCategory.validation';
const router = express.Router();

router.post(
  '/create-category',
  validateRequest(DonationCategoryValidation.createDonationCategoryZodSchema),
  DonationCategoryController.createDonationCategory
);

router.get('/', DonationCategoryController.getAllDonationCategory);

router.patch(
  '/:id',
  validateRequest(DonationCategoryValidation.updateDonationCategoryZodSchema),
  DonationCategoryController.updateDonationCategory
);
router.get('/:id', DonationCategoryController.getSingleDonationCategory);
router.delete('/:id', DonationCategoryController.deleteDonationCategory);

export const DonationCategoryRoutes = router;

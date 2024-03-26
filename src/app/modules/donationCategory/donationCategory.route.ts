import express from 'express';
import { DonationCategoryController } from './donationCategory.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DonationCategoryValidation } from './donationCategory.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-category',
  validateRequest(DonationCategoryValidation.createDonationCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  DonationCategoryController.createDonationCategory
);

router.get('/', DonationCategoryController.getAllDonationCategory);

router.patch(
  '/:id',
  validateRequest(DonationCategoryValidation.updateDonationCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  DonationCategoryController.updateDonationCategory
);

router.get('/:id', DonationCategoryController.getSingleDonationCategory);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DonationCategoryController.deleteDonationCategory
);

export const DonationCategoryRoutes = router;

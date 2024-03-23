import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { RatingValidation } from './rating.validation';
import { RatingController } from './rating.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-Rating',
  validateRequest(RatingValidation.createRatingZodSchema),
  auth(ENUM_USER_ROLE.USER),
  RatingController.createRating
);

router.get('/', RatingController.getAllRating);

router.patch(
  '/:id',
  // validateRequest(RatingValidation.update),
  RatingController.updateRating
);
router.get('/:id', RatingController.getSingleRating);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  RatingController.deleteRating
);

export const RatingRoutes = router;

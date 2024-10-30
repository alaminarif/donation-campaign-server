import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidation } from './payment.validation';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();

router.post(
  '/create-Payment',
  validateRequest(PaymentValidation.createPaymentZodSchema),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PaymentController.createPayment
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), PaymentController.getAllPayment);

router.patch(
  '/:id',
  validateRequest(PaymentValidation.updatedPaymentZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  PaymentController.updatePayment
);

router.get('/:id', PaymentController.getSinglePayment);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  PaymentController.deletePayment
);

export const PaymentRoutes = router;

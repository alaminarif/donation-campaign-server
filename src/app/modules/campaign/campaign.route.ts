import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CampaignValidation } from './campaign.validation';
import { CampaignController } from './campaign.controller';

// import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-campaign',
  validateRequest(CampaignValidation.createCampaignZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  CampaignController.createCampaign
);

router.get('/', CampaignController.getAllCampaign);

router.get('/:id', CampaignController.getSingleCampaign);

router.patch(
  '/:id',
  validateRequest(CampaignValidation.updateCampaignZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  CampaignController.updateCampaign
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  CampaignController.deleteCampaign
);

export const CampaignRoutes = router;

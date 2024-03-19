import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CampaignValidation } from './campaign.validation';
import { CampaignController } from './campaign.controller';
const router = express.Router();

router.post(
  '/create-campaign',
  validateRequest(CampaignValidation.createCampaignZodSchema),
  CampaignController.createCampaign
);

router.get('/', CampaignController.getAllCampaign);

router.patch(
  '/:id',
  validateRequest(CampaignValidation.updateCampaignZodSchema),
  CampaignController.updateCampaign
);
router.get('/:id', CampaignController.getSingleCampaign);
router.delete('/:id', CampaignController.deleteCampaign);

export const CampaignRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const campaign_validation_1 = require("./campaign.validation");
const campaign_controller_1 = require("./campaign.controller");
// import auth from '../../middlewares/auth';
const router = express_1.default.Router();
router.post('/create-campaign', (0, validateRequest_1.default)(campaign_validation_1.CampaignValidation.createCampaignZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
campaign_controller_1.CampaignController.createCampaign);
router.get('/', campaign_controller_1.CampaignController.getAllCampaign);
router.get('/:id', campaign_controller_1.CampaignController.getSingleCampaign);
router.patch('/:id', (0, validateRequest_1.default)(campaign_validation_1.CampaignValidation.updateCampaignZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
campaign_controller_1.CampaignController.updateCampaign);
router.delete('/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
campaign_controller_1.CampaignController.deleteCampaign);
exports.CampaignRoutes = router;

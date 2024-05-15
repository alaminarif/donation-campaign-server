"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const donation_validation_1 = require("./donation.validation");
const donation_controller_1 = require("./donation.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-donation', (0, validateRequest_1.default)(donation_validation_1.DonationValidation.createDonationZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), donation_controller_1.DonationController.createDonation);
router.get('/', donation_controller_1.DonationController.getAllDonation);
router.get('/:id', donation_controller_1.DonationController.getSingleDonation);
router.patch('/update-donation', (0, validateRequest_1.default)(donation_validation_1.DonationValidation.updateDonationZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), donation_controller_1.DonationController.updateDonation);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), donation_controller_1.DonationController.deleteDonation);
exports.DonationRoutes = router;

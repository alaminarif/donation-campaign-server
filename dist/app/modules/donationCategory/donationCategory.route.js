"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const donationCategory_controller_1 = require("./donationCategory.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const donationCategory_validation_1 = require("./donationCategory.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-category', (0, validateRequest_1.default)(donationCategory_validation_1.DonationCategoryValidation.createDonationCategoryZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), donationCategory_controller_1.DonationCategoryController.createDonationCategory);
router.get('/', donationCategory_controller_1.DonationCategoryController.getAllDonationCategory);
router.patch('/:id', (0, validateRequest_1.default)(donationCategory_validation_1.DonationCategoryValidation.updateDonationCategoryZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), donationCategory_controller_1.DonationCategoryController.updateDonationCategory);
router.get('/:id', donationCategory_controller_1.DonationCategoryController.getSingleDonationCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), donationCategory_controller_1.DonationCategoryController.deleteDonationCategory);
exports.DonationCategoryRoutes = router;

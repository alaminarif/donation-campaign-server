"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const donor_controller_1 = require("./donor.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const donor_validation_1 = require("./donor.validation");
const router = express_1.default.Router();
router.get('/', donor_controller_1.DonorController.getAllDonor);
router.get('/:email', 
// auth(ENUM_USER_ROLE.ADMIN),
donor_controller_1.DonorController.getSingleDonor);
router.patch('/:email', (0, validateRequest_1.default)(donor_validation_1.DonorValidation.updateDonorValidationSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
donor_controller_1.DonorController.updateDonor);
router.delete('/:email', donor_controller_1.DonorController.deleteDonor);
exports.DonorRoutes = router;

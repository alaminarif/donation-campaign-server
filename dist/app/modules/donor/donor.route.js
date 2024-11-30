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
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.donor, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), donor_controller_1.DonorController.getAllDonor);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), donor_controller_1.DonorController.getSingleDonor);
router.patch('/:id', (0, validateRequest_1.default)(donor_validation_1.DonorValidation.updateDonorValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), donor_controller_1.DonorController.updateDonor);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), donor_controller_1.DonorController.deleteDonor);
exports.DonorRoutes = router;

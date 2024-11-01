"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("../admin/admin.validation");
const manager_validation_1 = require("../manager/manager.validation");
const volunteer_validation_1 = require("../volunteer/volunteer.validation");
const donor_validation_1 = require("../donor/donor.validation");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminValidationSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.createAdmin);
router.post('/create-manager', (0, validateRequest_1.default)(manager_validation_1.ManagerValidation.createManagerValidationSchema), user_controller_1.UserController.createManager);
router.post('/create-volunteer', (0, validateRequest_1.default)(volunteer_validation_1.VolunteerValidation.createVolunteerValidationSchema), user_controller_1.UserController.createVolunteer);
router.post('/create-donor', (0, validateRequest_1.default)(donor_validation_1.DonorValidation.createDonorValidationSchema), user_controller_1.UserController.createDonor);
router.get('/me', 
// auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getMe);
exports.UserRoutes = router;

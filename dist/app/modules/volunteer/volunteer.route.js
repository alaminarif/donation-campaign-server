"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const volunteer_controller_1 = require("./volunteer.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const volunteer_validation_1 = require("./volunteer.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.volunteer, user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), volunteer_controller_1.VolunteerController.getAllVolunteers);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), volunteer_controller_1.VolunteerController.getSingleVolunteer);
router.patch('/:id', (0, validateRequest_1.default)(volunteer_validation_1.VolunteerValidation.updateVolunteerValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), volunteer_controller_1.VolunteerController.updatedVolunteer);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), volunteer_controller_1.VolunteerController.deleteVolunteer);
exports.VolunteerRoutes = router;

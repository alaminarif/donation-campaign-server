"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.post('/change-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordZodSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.super_admin, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.volunteer, user_constant_1.USER_ROLE.donor, user_constant_1.USER_ROLE.guest, user_constant_1.USER_ROLE.manager), auth_controller_1.AuthController.changePassword);
router.post('/forget-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthController.forgetPassword);
router.post('/reset-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPasswordValidationSchema), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_validation_1 = require("./admin.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const auth_validation_1 = require("../auth/auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
admin_controller_1.AdminController.loginAdmin);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
admin_controller_1.AdminController.refreshToken);
router.post('/change-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.changePassword);
router.get('/', admin_controller_1.AdminController.getAllAdmin);
router.get('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getMyProfile);
router.patch('/my-profile', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateProfileZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.updateProfile);
router.delete('/:id', admin_controller_1.AdminController.deleteAdmin);
router.patch('/my-profile', admin_controller_1.AdminController.updateProfile);
exports.AdminRoutes = router;

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
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.super_admin), admin_controller_1.AdminController.getAllAdmin);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.super_admin), admin_controller_1.AdminController.getSingleAdmin);
router.patch('/:email', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdminValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.super_admin), admin_controller_1.AdminController.updateAdmin);
router.delete('/:email', (0, auth_1.default)(user_constant_1.USER_ROLE.super_admin), admin_controller_1.AdminController.deleteAdmin);
exports.AdminRoutes = router;

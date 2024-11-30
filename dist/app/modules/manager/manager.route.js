"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const manager_validation_1 = require("./manager.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const manager_controller_1 = require("./manager.controller");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.manager, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), manager_controller_1.ManagerController.getAllManager);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), manager_controller_1.ManagerController.getSingleManager);
router.patch('/:id', (0, validateRequest_1.default)(manager_validation_1.ManagerValidation.updateManagerValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), manager_controller_1.ManagerController.updateManager);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.super_admin), manager_controller_1.ManagerController.deleteManager);
exports.ManagerRoutes = router;

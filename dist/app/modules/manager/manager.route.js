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
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express_1.default.Router();
router.get('/', manager_controller_1.ManagerController.getAllManager);
router.get('/:email', 
// auth(ENUM_USER_ROLE.ADMIN),
manager_controller_1.ManagerController.getSingleManager);
router.patch('/:email', (0, validateRequest_1.default)(manager_validation_1.ManagerValidation.updateManagerValidationSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
manager_controller_1.ManagerController.updateManager);
router.delete('/:email', manager_controller_1.ManagerController.deleteManager);
exports.ManagerRoutes = router;

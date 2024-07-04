'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
// import validateRequest from '../../middlewares/validateRequest';
const user_controller_1 = require('./user.controller');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_validation_1 = require('./user.validation');
const router = express_1.default.Router();
router.get('/', user_controller_1.UserController.getAllUser);
router.get(
  '/my-profile',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER),
  user_controller_1.UserController.getMe
);
router.patch(
  '/my-profile',
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateProfileZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER),
  user_controller_1.UserController.updateProfile
);
router.delete('/:id', user_controller_1.UserController.deleteUser);
router.patch('/my-profile', user_controller_1.UserController.updateProfile);
exports.UserRoutes = router;

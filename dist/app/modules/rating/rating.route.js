"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rating_validation_1 = require("./rating.validation");
const rating_controller_1 = require("./rating.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-Rating', (0, validateRequest_1.default)(rating_validation_1.RatingValidation.createRatingZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), rating_controller_1.RatingController.createRating);
router.get('/', rating_controller_1.RatingController.getAllRating);
router.patch('/:id', 
// validateRequest(RatingValidation.update),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), rating_controller_1.RatingController.updateRating);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), rating_controller_1.RatingController.getSingleRating);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), rating_controller_1.RatingController.deleteRating);
exports.RatingRoutes = router;

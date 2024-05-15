"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-Payment', (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.createPaymentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), payment_controller_1.PaymentController.createPayment);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payment_controller_1.PaymentController.getAllPayment);
router.patch('/:id', (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.updatedPaymentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payment_controller_1.PaymentController.updatePayment);
router.get('/:id', payment_controller_1.PaymentController.getSinglePayment);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payment_controller_1.PaymentController.deletePayment);
exports.PaymentRoutes = router;

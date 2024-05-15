"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_1 = require("../../../enums/user");
const comment_controller_1 = require("./comment.controller");
const comment_validation_1 = require("./comment.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-Comment', 
// validateRequest(CommentValidation.createCommentZodSchema),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), comment_controller_1.CommentController.createComment);
router.get('/', comment_controller_1.CommentController.getAllComment);
router.get('/my-comment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), comment_controller_1.CommentController.getMyComment);
router.patch('/my-comment', (0, validateRequest_1.default)(comment_validation_1.CommentValidation.updateCommentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), comment_controller_1.CommentController.updateComment);
router.delete('/:id', comment_controller_1.CommentController.deleteComment);
router.patch('/my-comment', comment_controller_1.CommentController.updateComment);
exports.CommentRoutes = router;

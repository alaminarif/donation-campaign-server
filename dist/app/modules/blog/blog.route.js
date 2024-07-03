"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-Blog', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), blog_controller_1.BlogController.createBlog);
router.get('/', blog_controller_1.BlogController.getAllBlog);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updatedBlogZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.updateBlog);
router.get('/my-blog', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), blog_controller_1.BlogController.getMyBlog);
router.get('/:id', blog_controller_1.BlogController.getSingleBlog);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
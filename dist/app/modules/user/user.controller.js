"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    // const us = req.headers.authorization;
    // console.log('us', us, req.user);
    const result = yield user_service_1.UserService.createAdminIntoDB(password, adminData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'admin created successfully  ',
        data: result,
    });
}));
const createManager = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, manager: managerData } = req.body;
    // const us = req.headers.authorization;
    // console.log('us', us, req.user);
    const result = yield user_service_1.UserService.createManagerIntoDB(password, managerData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'admin created successfully  ',
        data: result,
    });
}));
const createVolunteer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, volunteer: volunteerData } = req.body;
    const result = yield user_service_1.UserService.createVolunteerIntoDB(password, volunteerData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Volunteer created successfully  ',
        data: result,
    });
}));
const createDonor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, donor: donorData } = req.body;
    const result = yield user_service_1.UserService.createDonorIntoDB(password, donorData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'donor created successfully  ',
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { userEmail, role } = req.user;
    const result = yield user_service_1.UserService.getMe(userEmail, role);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Manager retrive successfully  ',
        data: result,
    });
}));
exports.UserController = {
    createAdmin,
    createManager,
    createVolunteer,
    createDonor,
    getMe,
};

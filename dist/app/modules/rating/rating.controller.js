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
exports.RatingController = void 0;
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../share/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../share/pick"));
const rating_service_1 = require("./rating.service");
const createRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield rating_service_1.RatingService.createRating(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'donationa categories created successfully  ',
        data: result,
    });
}));
const getAllRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield rating_service_1.RatingService.getAllRating(paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Donation Category retrive successfully  ',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getSingleRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield rating_service_1.RatingService.getSingleRating(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Donation Category rtive successfully  ',
        data: result,
    });
}));
const updateRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // paginationOptions
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const updatedData = req.body;
    const result = yield rating_service_1.RatingService.updateRating(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User delete successfully  ',
        data: result,
    });
}));
const deleteRating = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield rating_service_1.RatingService.deleteRating(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User delete successfully  ',
        data: result,
    });
}));
exports.RatingController = {
    createRating,
    getAllRating,
    getSingleRating,
    updateRating,
    deleteRating,
};

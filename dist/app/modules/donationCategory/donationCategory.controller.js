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
exports.DonationCategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const donationCategory_service_1 = require("./donationCategory.service");
const sendResponse_1 = __importDefault(require("../../../share/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const donationCategory_constant_1 = require("./donationCategory.constant");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../share/pick"));
const createDonationCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield donationCategory_service_1.DonationCategoryService.createDonationCategory(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'donationa categories created successfully  ',
        data: result,
    });
}));
const getAllDonationCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const filters = (0, pick_1.default)(req.query, donationCategory_constant_1.DonationCategoryFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield donationCategory_service_1.DonationCategoryService.getAllDonationCategory(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Donation Category retrive successfully  ',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getSingleDonationCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield donationCategory_service_1.DonationCategoryService.getSingleDonationCategory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Donation Category rtive successfully  ',
        data: result,
    });
}));
const updateDonationCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield donationCategory_service_1.DonationCategoryService.updateDonationCategory(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User delete successfully  ',
        data: result,
    });
}));
const deleteDonationCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield donationCategory_service_1.DonationCategoryService.deleteDonationCategory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User delete successfully  ',
        data: result,
    });
}));
exports.DonationCategoryController = {
    createDonationCategory,
    getAllDonationCategory,
    getSingleDonationCategory,
    updateDonationCategory,
    deleteDonationCategory,
};

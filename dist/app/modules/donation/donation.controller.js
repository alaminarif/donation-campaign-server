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
exports.DonationController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const donation_service_1 = require("./donation.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield donation_service_1.DonationService.createDonationIntoDB(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'donation created successfully  ',
        data: result,
    });
}));
const getAllDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_service_1.DonationService.getAllDonationFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Donation retrive successfully  ',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield donation_service_1.DonationService.getSingleDonationFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Donation rtive successfully  ',
        data: result,
    });
}));
const updateDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // paginationOptions
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const updatedData = req.body;
    const result = yield donation_service_1.DonationService.updateDonationIntoDB(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'updated donotion successfully  ',
        data: result,
    });
}));
const deleteDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield donation_service_1.DonationService.deleteDonationFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'donotion delete successfully  ',
        data: result,
    });
}));
exports.DonationController = {
    createDonation,
    getAllDonation,
    getSingleDonation,
    updateDonation,
    deleteDonation,
};

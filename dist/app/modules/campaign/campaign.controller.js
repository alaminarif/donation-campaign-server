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
exports.CampaignController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const campaign_service_1 = require("./campaign.service");
const createCampaign = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const campaign = req.body;
    const result = yield campaign_service_1.CampaignService.createCampaignIntoDB(campaign);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'donationa categories created successfully  ',
        data: result,
    });
}));
const getAllCampaign = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const result = yield campaign_service_1.CampaignService.getAllCampaignFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Campaign retrive successfully  ',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleCampaign = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield campaign_service_1.CampaignService.getSingleCampaignFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Campaign rtive successfully  ',
        data: result,
    });
}));
const updateCampaign = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield campaign_service_1.CampaignService.updateCampaignIntoDB(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Campaign updated successfully  ',
        data: result,
    });
}));
const deleteCampaign = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield campaign_service_1.CampaignService.deleteCampaignFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Campaign delete successfully  ',
        data: result,
    });
}));
exports.CampaignController = {
    createCampaign,
    getAllCampaign,
    getSingleCampaign,
    updateCampaign,
    deleteCampaign,
};

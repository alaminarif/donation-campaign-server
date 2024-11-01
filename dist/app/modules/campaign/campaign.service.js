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
exports.CampaignService = void 0;
const campaign_model_1 = require("./campaign.model");
const campaign_constant_1 = require("./campaign.constant");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const manager_model_1 = require("../manager/manager.model");
const createCampaignIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const managerId = payload === null || payload === void 0 ? void 0 : payload.manager;
    const isManagerExists = yield manager_model_1.Manager.findById(managerId);
    if (!isManagerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'manager not found !');
    }
    const result = (yield campaign_model_1.Campaign.create(payload)).populate('manager');
    return result;
});
const getAllCampaignFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const campaignQuery = new QueryBuilder_1.default(campaign_model_1.Campaign.find().populate('manager'), query)
        .search(campaign_constant_1.campaignSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield campaignQuery.modelQuery;
    const meta = yield campaignQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleCampaignFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield campaign_model_1.Campaign.findById({ _id: id }).populate('manager');
    return result;
});
const updateCampaignIntoDB = (id, paylaoad) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { _id: id };
    const isExist = yield campaign_model_1.Campaign.findOne(query);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Campaign does't exist ");
    }
    const result = yield campaign_model_1.Campaign.findByIdAndUpdate(query, paylaoad, {
        new: true,
    });
    return result;
});
const deleteCampaignFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield campaign_model_1.Campaign.findByIdAndDelete({ _id: id });
    return result;
});
exports.CampaignService = {
    createCampaignIntoDB,
    getAllCampaignFromDB,
    getSingleCampaignFromDB,
    updateCampaignIntoDB,
    deleteCampaignFromDB,
};

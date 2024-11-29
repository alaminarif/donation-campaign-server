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
exports.DonationService = void 0;
const donation_model_1 = require("./donation.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const donor_constant_1 = require("../donor/donor.constant");
const donor_model_1 = require("../donor/donor.model");
const campaign_model_1 = require("../campaign/campaign.model");
const createDonationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const campaignId = payload === null || payload === void 0 ? void 0 : payload.campaign;
    const iscampaignExists = yield campaign_model_1.Campaign.findById(campaignId);
    if (!iscampaignExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'campaign not found !');
    }
    const donorId = payload === null || payload === void 0 ? void 0 : payload.donor;
    const isDonorExists = yield donor_model_1.Donor.findById(donorId);
    if (!isDonorExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'donor not found !');
    }
    const result = (yield donation_model_1.Donation.create(payload)).populate('campaign donor');
    return result;
});
const getAllDonationFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const donationQuery = new QueryBuilder_1.default(donation_model_1.Donation.find().populate('campaign donor'), query)
        .search(donor_constant_1.donorSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield donationQuery.modelQuery;
    const meta = yield donationQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleDonationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_model_1.Donation.findById(id).populate('campaign donor');
    return result;
});
const updateDonationIntoDB = (id, paylaoad) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { user: id };
    const isExist = yield donation_model_1.Donation.findOne(query);
    // console.log('isExist : ', isExist);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'user Not found');
    }
    const result = yield donation_model_1.Donation.findByIdAndUpdate(query, paylaoad, {
        new: true,
    }).populate('user');
    return result;
});
const deleteDonationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_model_1.Donation.findByIdAndDelete({ _id: id });
    return result;
});
exports.DonationService = {
    createDonationIntoDB,
    getAllDonationFromDB,
    getSingleDonationFromDB,
    updateDonationIntoDB,
    deleteDonationFromDB,
};

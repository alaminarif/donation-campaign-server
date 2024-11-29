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
exports.VolunteerController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const volunteer_service_1 = require("./volunteer.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getAllVolunteers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield volunteer_service_1.VolunteerService.getAllvolunteersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'volunteer are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleVolunteer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield volunteer_service_1.VolunteerService.getSingleVolunteerFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Volunteer retrive successfully  ',
        data: result,
    });
}));
const updatedVolunteer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { volunteer } = req.body;
    const result = yield volunteer_service_1.VolunteerService.updateVolunteerIntoDB(email, volunteer);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Volunteer is updated successfully',
        data: result,
    });
}));
const deleteVolunteer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { email } = req.params;
    const result = yield volunteer_service_1.VolunteerService.deleteVolunteerFromDB(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Volunteer delete successfully  ',
        data: result,
    });
}));
exports.VolunteerController = {
    getAllVolunteers,
    getSingleVolunteer,
    updatedVolunteer,
    deleteVolunteer,
};

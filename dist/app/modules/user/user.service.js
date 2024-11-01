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
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const admin_model_1 = require("../admin/admin.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const manager_model_1 = require("../manager/manager.model");
const volunteer_model_1 = require("../volunteer/volunteer.model");
const donor_model_1 = require("../donor/donor.model");
const createAdminIntoDB = (password, adminData) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const userData = {};
    userData.role = 'admin';
    userData.password = password;
    userData.email = adminData.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        adminData.email = newUser[0].email;
        adminData.user = newUser[0]._id;
        const newAdmin = yield admin_model_1.Admin.create([adminData], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createManagerIntoDB = (password, managerData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.role = 'manager';
    userData.password = password;
    userData.email = managerData.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        managerData.email = newUser[0].email;
        managerData.user = newUser[0]._id;
        const newManager = yield manager_model_1.Manager.create([managerData], { session });
        if (!newManager.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newManager;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const createVolunteerIntoDB = (password, volunteerData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password;
    userData.email = volunteerData.email;
    userData.role = 'volunteer';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        volunteerData.email = newUser[0].email;
        volunteerData.user = newUser[0]._id;
        const newVolunteer = yield volunteer_model_1.Volunteer.create([volunteerData], { session });
        if (!newVolunteer.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newVolunteer;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createDonorIntoDB = (password, donorData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.password = password;
    userData.email = donorData.email;
    userData.role = 'donor';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        donorData.email = newUser[0].email;
        donorData.user = newUser[0]._id;
        const newVolunteer = yield donor_model_1.Donor.create([donorData], { session });
        if (!newVolunteer.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create donor');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newVolunteer;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getMe = (userEmail, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'admin') {
        result = yield admin_model_1.Admin.findOne({ email: userEmail }).populate('user');
    }
    if (role === 'donor') {
        result = yield donor_model_1.Donor.findOne({ email: userEmail }).populate('user');
    }
    if (role === 'manager') {
        result = yield manager_model_1.Manager.findOne({ email: userEmail }).populate('user');
    }
    if (role === 'volunteer') {
        result = yield volunteer_model_1.Volunteer.findOne({ email: userEmail }).populate('user');
    }
    console.log(result);
    return result;
});
exports.UserService = {
    createAdminIntoDB,
    createManagerIntoDB,
    createVolunteerIntoDB,
    createDonorIntoDB,
    getMe,
};

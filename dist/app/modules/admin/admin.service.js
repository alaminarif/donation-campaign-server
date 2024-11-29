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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const admin_model_1 = require("./admin.model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const admin_constant_1 = require("./admin.constant");
const getAllAdminsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const adminQuery = new QueryBuilder_1.default(admin_model_1.Admin.find(), query)
        .search(admin_constant_1.AdminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield adminQuery.modelQuery;
    const meta = yield adminQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id);
    return result;
});
const updateAdminIntroDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const user = yield user_model_1.User.isUserExistByEmail(email);
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin Not found');
    }
    const { name } = payload, remainingAdminData = __rest(payload, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingAdminData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate({ email: email }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteAdminFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const user = yield user_model_1.User.isUserExistByEmail(email);
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is already deleted !');
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin Not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedAdmin = yield admin_model_1.Admin.findOneAndUpdate({ email }, { isDeleted: true }, { new: true, session });
        if (!deletedAdmin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'failed to delete Admin');
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ email }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'failed to delete User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
exports.AdminService = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updateAdminIntroDB,
    deleteAdminFromDB,
};

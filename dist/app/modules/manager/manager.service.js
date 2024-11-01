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
exports.ManagerService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const manager_model_1 = require("./manager.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const manager_constant_1 = require("./manager.constant");
const getAllmanager = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const managerQuery = new QueryBuilder_1.default(manager_model_1.Manager.find(), query)
        .search(manager_constant_1.managerSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield managerQuery.modelQuery;
    const meta = yield managerQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getSingleManagerFromDB = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield manager_model_1.Manager.findOne({ email: adminId });
    return result;
});
const updateManagerIntroDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const isExist = yield manager_model_1.Manager.findOne({ email: email });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Manager Not found');
    }
    const { name } = payload, remainingManagerData = __rest(payload, ["name"]);
    console.log('name:', payload);
    const modifiedUpdatedData = Object.assign({}, remainingManagerData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = yield manager_model_1.Manager.findOneAndUpdate({ email: email }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteManagerFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedmanager = yield manager_model_1.Manager.findOneAndUpdate({ email }, { isDeleted: true }, { new: true, session });
        if (!deletedmanager) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'failed to delete manager');
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ email }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'failed to delete User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedmanager;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
exports.ManagerService = {
    getAllmanager,
    getSingleManagerFromDB,
    updateManagerIntroDB,
    deleteManagerFromDB,
};

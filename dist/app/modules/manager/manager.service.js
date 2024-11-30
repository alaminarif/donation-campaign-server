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
const getSingleManagerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield manager_model_1.Manager.findById(id);
    return result;
});
const updateManagerIntroDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const user = yield manager_model_1.Manager.isManagerExistsById(id);
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Manager Not found');
    }
    const { name } = payload, remainingManagerData = __rest(payload, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingManagerData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = yield manager_model_1.Manager.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteManagerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield manager_model_1.Manager.isManagerExistsById(id);
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Manager Not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedmanager = yield manager_model_1.Manager.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedmanager) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'failed to delete manager');
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
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

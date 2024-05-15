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
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const admin_constant_1 = require("./admin.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// auth part start
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.role = 'admin';
    const result = yield admin_model_1.Admin.create(payload);
    return result;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(email);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'admin does not exist');
    }
    const { email: adminEmail, role, _id } = isAdminExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, adminEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, adminEmail, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { adminEmail } = verifiedToken;
    // checking deleted Admin's refresh token
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(adminEmail);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.email,
        role: isAdminExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (Admin, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword } = payload;
    const isAdminExist = yield (Admin === null || Admin === void 0 ? void 0 : Admin.findOne({
        email: Admin === null || Admin === void 0 ? void 0 : Admin.adminEmail,
    }).select('+password'));
    // console.log('isAdminExist', isAdminExist);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'admin does not exist');
    }
    if (isAdminExist.password &&
        !(yield (Admin === null || Admin === void 0 ? void 0 : Admin.isPasswordMatched(oldPassword, isAdminExist.password)))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'old password is incorrect');
    }
    // await Admin.updateOne();
    isAdminExist.save();
});
// auth part end
const getAllAdmin = (filter, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const { searchTerm } = filter, filterData = __rest(filter, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: admin_constant_1.adminSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whareConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield admin_model_1.Admin.find(whareConditions)
        .skip(skip)
        .limit(limit)
        .sort(sortConditions);
    const total = yield admin_model_1.Admin.countDocuments(whareConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getMyProfile = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ email: email });
    return result;
});
const updateProfile = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    // const isExist = await Admin.findOne({ email: email });
    // if (!isExist) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
    // }
    const { name } = payload, AdminData = __rest(payload, ["name"]);
    const updatedAdminData = Object.assign({}, AdminData);
    // const updatedAdminData: Partial<IAdmin> = AdminData;
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedAdminData[nameKey] = name[key];
        });
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate({ email: email }, updatedAdminData, {
        new: true,
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findByIdAndDelete({ _id: id });
    return result;
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
    refreshToken,
    changePassword,
    getAllAdmin,
    getMyProfile,
    updateProfile,
    deleteAdmin,
};

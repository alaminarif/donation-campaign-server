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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./../user/user.model");
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utils/sendEmail");
const auth_utils_1 = require("./auth.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield user_model_1.User.isUserExistByEmail(email);
    // const isUserExist = await User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'this user is Deleted');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
    // const { email: userEmail, role, _id } = user;
    // const accessToken = jwtHelpers.createToken(
    //   { userEmail, role, _id },
    //   config.jwt.secret as Secret,
    //   config.jwt.expires_in as string
    // );
    // const refreshToken = jwtHelpers.createToken(
    //   { userEmail, role, _id },
    //   config.jwt.refresh_secret as Secret,
    //   config.jwt.refresh_expires_in as string
    // );
    // return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifiedToken = null;
    try {
        verifiedToken = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userEmail } = verifiedToken;
    // checking deleted user's refresh token
    const user = yield user_model_1.User.isUserExistByEmail(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const user = yield user_model_1.User.isUserExistByEmail(userData === null || userData === void 0 ? void 0 : userData.userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this user is not found !');
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    if (!(yield user_model_1.User.isPasswordMatched(oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    const newHashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const query = { email: userData === null || userData === void 0 ? void 0 : userData.userEmail, role: userData === null || userData === void 0 ? void 0 : userData.role };
    const updatedData = {
        password: newHashPassword,
        passwordchangedAt: new Date(),
    };
    yield user_model_1.User.updateOne(query, updatedData);
});
const forgetPassword = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this user is not found !');
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'this user is deleted');
    }
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const resetLink = `${config_1.default.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetLink);
    console.log('resetLink', resetLink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this user is not found !');
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'this user is deleted');
    }
    const decode = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
    console.log('decode', decode);
    console.log(payload.email, decode.userEmail);
    if (payload.email !== decode.userEmail) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'you are forbidden');
    }
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: decode.userEmail,
        role: decode.role,
    }, {
        password: newHashPassword,
        passwordchangedAt: new Date(),
    });
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};

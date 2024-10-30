'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const AppError_1 = __importDefault(require('../../../errors/AppError'));
const user_model_1 = require('./../user/user.model');
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const config_1 = __importDefault(require('../../../config'));
const createUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    payload.role = 'user';
    const result = yield user_model_1.User.create(payload);
    return result;
  });
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    // const {password}= isUserExist
    // const isPasswordMatched = await bcrypt.compare(
    //   password,
    //   isUserExist?.password
    // );
    if (
      isUserExist.password &&
      !(yield user_model_1.User.isPasswordMatched(
        password,
        isUserExist === null || isUserExist === void 0
          ? void 0
          : isUserExist.password
      ))
    ) {
      throw new AppError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorrect'
      );
    }
    const { email: userEmail, role, _id } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { userEmail, role, _id },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { userEmail, role, _id },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    return { accessToken, refreshToken };
  });
// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new AppError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }
//   const { email } = verifiedToken;
//   const isUserExist = await User.isUserExist(email);
//   if (!isUserExist) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       email: isUserExist.email,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );
//   return {
//     accessToken: newAccessToken,
//   };
// };
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (err) {
      throw new AppError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid Refresh Token'
      );
    }
    const { userEmail } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        email: isUserExist.email,
        role: isUserExist.role,
      },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    console.log('newAccessToken: ', newAccessToken);
    return {
      accessToken: newAccessToken,
    };
  });
const changePassword = (user, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(
      user === null || user === void 0 ? void 0 : user.userEmail
    );
    if (!isUserExist) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    if (
      isUserExist.password &&
      !(yield user_model_1.User.isPasswordMatched(
        oldPassword,
        isUserExist.password
      ))
    ) {
      throw new AppError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'old password is incorrect'
      );
    }
    const newHashPassword = yield bcrypt_1.default.hash(
      newPassword,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    const query = {
      email: user === null || user === void 0 ? void 0 : user.userEmail,
    };
    const updatedData = {
      password: newHashPassword,
      passwordchangedAt: new Date(),
    };
    yield user_model_1.User.updateOne(query, updatedData);
  });
exports.AuthService = {
  createUser,
  loginUser,
  refreshToken,
  changePassword,
};

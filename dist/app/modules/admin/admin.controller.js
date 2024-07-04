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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const admin_service_1 = require('./admin.service');
const sendResponse_1 = __importDefault(require('../../../share/sendResponse'));
const catchAsync_1 = __importDefault(require('../../../share/catchAsync'));
const config_1 = __importDefault(require('../../../config'));
const admin_constant_1 = require('./admin.constant');
const pick_1 = __importDefault(require('../../../share/pick'));
const pagination_1 = require('../../../constants/pagination');
const createAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.body;
    // const us = req.headers.authorization;
    // console.log('us', us, req.user);
    const result = yield admin_service_1.AdminService.createAdmin(admin);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'admin created successfully  ',
      data: result,
    });
  })
);
const loginAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    console.log('Admin', req.user);
    const result = yield admin_service_1.AdminService.loginAdmin(loginData);
    const { refreshToken } = result,
      others = __rest(result, ['refreshToken']);
    console.log('res', refreshToken);
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Admin loggedin successfully !',
      data: others,
    });
  })
);
const refreshToken = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield admin_service_1.AdminService.refreshToken(
      refreshToken
    );
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
      statusCode: 200,
      success: true,
      message: 'Admin lohggedin successfully !',
      data: result,
    });
  })
);
const changePassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const Admin = req.user;
    console.log('Admin : ', Admin);
    const passwordData = __rest(req.body, []);
    const result = yield admin_service_1.AdminService.changePassword(
      Admin,
      passwordData
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'changePassword successfully  ',
      data: result,
    });
  })
);
const getAllAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const filters = (0, pick_1.default)(
      req.query,
      admin_constant_1.adminFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield admin_service_1.AdminService.getAllAdmin(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Admin retrive successfully  ',
      meta: result === null || result === void 0 ? void 0 : result.meta,
      data: result === null || result === void 0 ? void 0 : result.data,
    });
  })
);
const getMe = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // paginationOptions
    const email =
      (_a = req.user) === null || _a === void 0 ? void 0 : _a.adminEmail;
    console.log(' : ', email);
    const result = yield admin_service_1.AdminService.getMe(email);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Admin retrive successfully  ',
      data: result,
    });
  })
);
const updateProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // paginationOptions
    const email =
      (_b = req.user) === null || _b === void 0 ? void 0 : _b.adminEmail;
    const updatedData = req.body;
    const result = yield admin_service_1.AdminService.updateProfile(
      email,
      updatedData
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Admin Updated successfully  ',
      data: result,
    });
  })
);
const deleteAdminFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // paginationOptions
    const { id } = req.params;
    const result = yield admin_service_1.AdminService.deleteAdminFromDB(id);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Admin delete successfully  ',
      data: result,
    });
  })
);
exports.AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
  changePassword,
  getAllAdmin,
  getMe,
  updateProfile,
  deleteAdminFromDB,
};

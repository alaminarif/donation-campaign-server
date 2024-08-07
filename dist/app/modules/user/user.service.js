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
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const user_model_1 = require('./user.model');
const user_constant_1 = require('./user.constant');
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';
const getAllUser = (filter, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //
    const { searchTerm } = filter,
      filterData = __rest(filter, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: user_constant_1.userSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whareConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whareConditions)
      .skip(skip)
      .limit(limit)
      .sort(sortConditions);
    const total = yield user_model_1.User.countDocuments(whareConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getMe = email =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: email });
    return result;
  });
const updateProfile = (email, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //
    // const isExist = await User.findOne({ email: email });
    // if (!isExist) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'User Not found');
    // }
    const { name } = payload,
      userData = __rest(payload, ['name']);
    const updatedUserData = Object.assign({}, userData);
    // const updatedUserData: Partial<TUser> = userData;
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedUserData[nameKey] = name[key];
      });
    }
    const result = yield user_model_1.User.findOneAndUpdate(
      { email: email },
      updatedUserData,
      {
        new: true,
      }
    );
    return result;
  });
const deleteUser = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete({ _id: id });
    return result;
  });
exports.UserService = {
  getAllUser,
  getMe,
  updateProfile,
  deleteUser,
};
// const andConditions = [
//   {
//     $or: [
//       {
//         phoneNumber: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       },
//     ],
//   },
// ];

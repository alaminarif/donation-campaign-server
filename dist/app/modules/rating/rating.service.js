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
exports.RatingService = void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const rating_model_1 = require('./rating.model');
const http_status_1 = __importDefault(require('http-status'));
const AppError_1 = __importDefault(require('../../../errors/AppError'));
const createRating = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rating_model_1.Rating.create(payload);
    return result;
  });
const getAllRating = paginationOptions =>
  __awaiter(void 0, void 0, void 0, function* () {
    //
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const result = yield rating_model_1.Rating.find({})
      .populate('user')
      .skip(skip)
      .limit(limit)
      .sort(sortConditions);
    const total = yield rating_model_1.Rating.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleRating = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rating_model_1.Rating.findById({ _id: id }).populate(
      'user'
    );
    return result;
  });
const updateRating = (id, paylaoad) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = { user: id };
    const isExist = yield rating_model_1.Rating.findOne(query);
    // console.log('isExist : ', isExist);
    if (!isExist) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'Comment Not found'
      );
    }
    const result = yield rating_model_1.Rating.findByIdAndUpdate(
      query,
      paylaoad,
      {
        new: true,
      }
    );
    return result;
  });
const deleteRating = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rating_model_1.Rating.findByIdAndDelete({ _id: id });
    return result;
  });
exports.RatingService = {
  createRating,
  getAllRating,
  getSingleRating,
  updateRating,
  deleteRating,
};

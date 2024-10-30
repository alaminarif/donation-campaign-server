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
exports.CommentService = void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const comment_model_1 = require('./comment.model');
const AppError_1 = __importDefault(require('../../../errors/AppError'));
const http_status_1 = __importDefault(require('http-status'));
const createComment = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield comment_model_1.Comment.create(payload)).populate(
      'user'
    );
    return result;
  });
const getAllComment = paginationOptions =>
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
    const result = yield comment_model_1.Comment.find({})
      .populate('user')
      .skip(skip)
      .limit(limit)
      .sort(sortConditions);
    const total = yield comment_model_1.Comment.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getMyComment = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { user: id };
    const isExist = yield comment_model_1.Comment.findOne(query);
    if (!isExist) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'user Not found'
      );
    }
    const result = yield comment_model_1.Comment.findOne(query).populate(
      'user'
    );
    return result;
  });
const updateComment = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { user: id };
    const isExist = yield comment_model_1.Comment.findOne(query);
    // console.log('isExist : ', isExist);
    if (!isExist) {
      throw new AppError_1.default(
        http_status_1.default.NOT_FOUND,
        'Comment Not found'
      );
    }
    const result = yield comment_model_1.Comment.findOneAndUpdate(
      query,
      payload,
      {
        new: true,
      }
    ).populate('user');
    return result;
  });
const deleteComment = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.findByIdAndDelete({ _id: id });
    return result;
  });
exports.CommentService = {
  createComment,
  getAllComment,
  getMyComment,
  updateComment,
  deleteComment,
};

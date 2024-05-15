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
exports.BlogService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const blog_model_1 = require("./blog.model");
const blog_constant_1 = require("./blog.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield blog_model_1.Blog.create(payload)).populate('comment');
    return result;
});
const getAllBlog = (filter, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const { searchTerm } = filter, filterData = __rest(filter, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: blog_constant_1.blogSearchableFields.map(field => ({
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
    const result = yield blog_model_1.Blog.find(whareConditions)
        .populate('comment')
        .skip(skip)
        .limit(limit)
        .sort(sortConditions);
    const total = yield blog_model_1.Blog.countDocuments(whareConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { id: id };
    const isExist = yield blog_model_1.Blog.findOne(query);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user Not found');
    }
    const result = yield blog_model_1.Blog.findOne(query).populate('comment');
    return result;
});
const getMyBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { user: id };
    const isExist = yield blog_model_1.Blog.findOne(query);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user Not found');
    }
    const result = yield blog_model_1.Blog.findOne(query).populate('user');
    return result;
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const query = { _id: id };
    const isExist = yield blog_model_1.Blog.findOne(query);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Blog Not found');
    }
    const result = yield blog_model_1.Blog.findOneAndUpdate(query, payload, {
        new: true,
    }).populate('comment');
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndDelete({ _id: id }).populate('comment');
    return result;
});
exports.BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    getMyBlog,
    updateBlog,
    deleteBlog,
};

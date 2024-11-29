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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donor = void 0;
const mongoose_1 = require("mongoose");
const donor_constant_1 = require("./donor.constant");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
});
const DonorSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: {
            values: donor_constant_1.Gender,
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: donor_constant_1.BloodGroup,
            message: '{VALUE} is not a valid blood group',
        },
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    dateOfBirth: { type: Date },
    profileImg: { type: String },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// generating full name
DonorSchema.virtual('fullName').get(function () {
    var _a, _b;
    return ((_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName) + '' + ((_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.lastName);
});
// query middlewares
DonorSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
DonorSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
DonorSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
DonorSchema.statics.isUserExists = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Donor.findOne({ email });
        return existingUser;
    });
};
exports.Donor = (0, mongoose_1.model)('Donor', DonorSchema);

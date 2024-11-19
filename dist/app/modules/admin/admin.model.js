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
Object.defineProperty(exports, '__esModule', { value: true });
exports.Admin = void 0;
const mongoose_1 = require('mongoose');
// import bcrypt from 'bcrypt';
const admin_constant_1 = require('./admin.constant');
// import config from '../../../config';
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
const AdminSchema = new mongoose_1.Schema(
  {
    user: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: admin_constant_1.Gender,
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
        values: admin_constant_1.BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    dateOfBirth: { type: Date },
    profileImg: { type: String },
    address: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// query middlewares
AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
AdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
AdminSchema.statics.isUserExists = function (email) {
  return __awaiter(this, void 0, void 0, function* () {
    const existingUser = yield exports.Admin.findOne({ email });
    return existingUser;
  });
};
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);

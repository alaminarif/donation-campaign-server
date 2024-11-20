import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';
import { BloodGroup, Gender } from './manager.constant';
import { ManagerModel, TManager, TUserName } from './manager.interface';
// import config from '../../../config';

const userNameSchema = new Schema<TUserName>({
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

const ManagerSchema = new Schema<TManager, ManagerModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
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
        values: Gender,
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
        values: BloodGroup,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// generating full name
ManagerSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + '' + this?.name?.lastName;
});

// query middlewares
ManagerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ManagerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ManagerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

ManagerSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Manager.findOne({ email });
  return existingUser;
};

export const Manager = model<TManager, ManagerModel>('Manager', ManagerSchema);

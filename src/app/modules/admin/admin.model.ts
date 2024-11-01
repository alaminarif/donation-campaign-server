import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';
import { BloodGroup, Gender } from './admin.constant';
import { AdminModel, TAdmin, TUserName } from './admin.interface';
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

const AdminSchema = new Schema<TAdmin, AdminModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
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
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },

    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },

    bloogGroup: {
      type: String,
      enum: {
        values: BloodGroup,
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

AdminSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Admin.findOne({ email });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', AdminSchema);

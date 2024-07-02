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

    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: true,
      // unique: true,
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

    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },

    bloogGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },

    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },

    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    dateOfBirth: { type: Date },

    profileImg: { type: String },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    // address: {
    //   type: String,
    //   required: true,
    // },
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

// AdminSchema.statics.isAdminExist = async function (
//   email: string
// ): Promise<Pick<TAdmin, '_id' | 'email' | 'password' | 'role'> | null> {
//   return await Admin.findOne(
//     { email },
//     { _id: 1, email: 1, password: 1, role: 1 }
//   );
// };

// //
// AdminSchema.statics.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

// AdminSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   next();
// });
export const Admin = model<TAdmin, AdminModel>('Admin', AdminSchema);

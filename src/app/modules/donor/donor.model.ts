import { model, Schema } from 'mongoose';
import { DonorModel, TDonor, TUserName } from './donor.interface';
import { BloodGroup, Gender } from './donor.constant';

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

const DonorSchema = new Schema<TDonor, DonorModel>(
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

    bloogGroup: {
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
    versionKey: false,
  }
);

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

DonorSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Donor.findOne({ email });
  return existingUser;
};

export const Donor = model<TDonor, DonorModel>('Donor', DonorSchema);

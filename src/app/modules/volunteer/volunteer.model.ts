import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';
import { BloodGroup, Days, Gender } from './volunteer.constant';
import { VolunteerModel, TVolunteer, TUserName } from './volunteer.interface';
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

const VolunteerSchema = new Schema<TVolunteer, VolunteerModel>(
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

    dateOfBirth: { type: Date },

    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },

    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },

    skill: {
      type: String,
      required: [true, 'skill is required'],
    },

    abailability: {
      type: String,
      enum: Days,
    },
    preferredCampaigns: {
      type: String,
    },

    startDate: {
      type: Date,
      required: [true, 'startDate is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'endDate is required'],
    },
    hoursLogged: {
      type: String,
    },
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
VolunteerSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + '' + this?.name?.lastName;
});

// query middlewares
VolunteerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

VolunteerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

VolunteerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

VolunteerSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Volunteer.findOne({ email });
  return existingUser;
};

export const Volunteer = model<TVolunteer, VolunteerModel>(
  'Volunteer',
  VolunteerSchema
);

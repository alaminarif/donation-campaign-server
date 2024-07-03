import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { role } from './user.constant';
import config from '../../../config';

const UserSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordchangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: role,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<
  TUser,
  '_id' | 'email' | 'password' | 'role' | 'isDeleted'
> | null> {
  return await User.findOne(
    { email },
    { _id: 1, email: 1, password: 1, role: 1, isDeleted: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.statics.isJWTIssuedDeforedPasswordChanged = async function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimestamp;
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser, UserModel>('User', UserSchema);

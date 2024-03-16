import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.constant';
import config from '../../../config';

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password' | 'role'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const User = model<IUser, UserModel>('User', UserSchema);

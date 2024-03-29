import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { role } from './admin.constant';
import { AdminModel, IAdmin } from './admin.interface';
import config from '../../../config';

const AdminSchema = new Schema<IAdmin, AdminModel>(
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

AdminSchema.statics.isAdminExist = async function (
  email: string
): Promise<Pick<IAdmin, '_id' | 'email' | 'password' | 'role'> | null> {
  return await Admin.findOne(
    { email },
    { _id: 1, email: 1, password: 1, role: 1 }
  );
};

//
AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

AdminSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);

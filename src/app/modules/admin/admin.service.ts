import { IAdmin, ILoginAdmin, ILoginAdminResponse } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  payload.role = 'admin';
  const result = await Admin.create(payload);
  return result;
};

// const loginAdmin = async (
//   payload: ILoginAdmin
// ): Promise<ILoginAdminResponse> => {
//   const { email, password } = payload;
// };

// const isUserExist = await Admin.isAdminExist(email);

export const AdminService = {
  createAdmin,
};

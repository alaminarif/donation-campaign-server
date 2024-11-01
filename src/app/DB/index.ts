import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  email: 'arifurr231@gmail.com',
  password: config.super_admin_password,
  role: 'super_admin',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({
    role: USER_ROLE.super_admin,
  });

  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;

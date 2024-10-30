import config from '../config';
import { ENUM_USER_ROLE } from '../enums/user';
// import { ENUM_USER_ROLE } from '../../enums/user';
import { User } from '../modules/user/user.model';

const superUser = {
  email: 'arifurr231@gmail.com',
  password: config.super_admin_password,
  role: 'super_admin',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({
    role: ENUM_USER_ROLE.SUPER_ADMIN,
  });

  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;

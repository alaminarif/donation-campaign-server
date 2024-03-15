export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  refreshToken?: string;
  accessToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IchangePassword = {
  oldPassword: string;
  newPassword: string;
};

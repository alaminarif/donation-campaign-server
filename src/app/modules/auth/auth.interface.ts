export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
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

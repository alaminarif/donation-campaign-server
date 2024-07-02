export type TLogin = {
  email: string;
  password: string;
};

export type TLoginResponse = {
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

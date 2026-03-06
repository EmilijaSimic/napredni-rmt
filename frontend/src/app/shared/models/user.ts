export interface UserInitialsModel {
  thumbUrl: string;
  firstName: string;
  lastName: string;
  initials: string;
}

export interface UserLoginModel {
  username: string;
  password: string;
}

export interface UserMeModel extends UserInitialsModel {
  id: string;
  dateVerificationCodeExpires: string;
  createdAt: string;
}

export interface UserRegisterModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponseModel {
  token: string;
  roles: string[];
}

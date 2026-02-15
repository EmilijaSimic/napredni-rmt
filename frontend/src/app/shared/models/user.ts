export interface UserInitialsModel {
  thumbUrl: string;
  firstName: string;
  lastName: string;
  initials: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserMeModel extends UserInitialsModel {
  id: string; // Guid → string
  dateVerificationCodeExpires: string; // DateTime → ISO string
  createdAt: string; // DateTime → ISO string
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

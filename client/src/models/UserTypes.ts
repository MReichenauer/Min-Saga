export type RegisterUserType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordType = {
  email: string;
  confirmEmail: string;
};

export type LoginEmailPassType = Omit<RegisterUserType, "confirmPassword">;

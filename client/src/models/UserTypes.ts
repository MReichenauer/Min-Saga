export type RegisterUserType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginEmailPassType = Omit<RegisterUserType, "confirmPassword">;

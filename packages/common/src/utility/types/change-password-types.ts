export interface IChangePasswordRequest {
    current_password: string;
    password: string;
    confirm_password: string;
    token?: string;
}
  
export interface IResetPasswordRequest {
    password: string;
    confirmPassword: string;
    token?: string;
}
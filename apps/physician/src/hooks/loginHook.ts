import { useState } from "react";
import { loginService } from "../utility/service/loginService";
import { ILoginRequest } from "../pages/auth/login/presentation/types";

export const LoginHook = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const login = async (requestParams: ILoginRequest) => {
    try {
      setLoginError("");
      setLoading(true);
      const result = await loginService.login(requestParams);
      return result;
    } catch (error: any) {
      setLoginError(
        error?.data?.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, loginError };
};

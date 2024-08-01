import React, { useEffect, useState } from "react";
import { ChangePasswordScreen as ChangePassword } from "../presentation";
import { APIConstant, BaseService, ChangePasswordHook, IChangePasswordRequest, IResponse } from "@repo/common/common-library";
import { toast } from "sonner";

export const ChangePasswordContainer = () => {
  const { changePassword, errorMessage, isLoading, setIsLoading } = ChangePasswordHook();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("q");
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isSaveToken, setIsSaveToken] = useState<string>();

  const checkIsTokenExpired = async () => {
    if (token) {
      try {
        setIsSaveToken(token);
        const response = await BaseService.get<IResponse>(
          `${APIConstant.resetPharmacyPasswordUrl}${token}`,
          true
        );
        if (response?.state === 'success') {
          setIsTokenExpired(response?.results?.flag);
        } else if (response?.state === 'error') {
          toast.error(response?.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const changePasswordHandler = async (dataItem: any): Promise<string | undefined> => {
    setIsLoading(true);
    try {
      if (!isTokenExpired) {
        const request = dataItem as IChangePasswordRequest;
        request.token = isSaveToken;
        const response = await changePassword(request);
        if (response?.state === "success") {
          toast.success(response?.message);
        } else {
          toast.error("Please enter correct current password");
        }
        return response?.state;
      }
    } catch (error: any) {
      error?.data?.error && toast.error(error?.data?.error);
      error?.data?.message && toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIsTokenExpired();
  }, []);

  return (
    <ChangePassword
      onSubmit={changePasswordHandler}
      isTokenExpired={isTokenExpired}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
};

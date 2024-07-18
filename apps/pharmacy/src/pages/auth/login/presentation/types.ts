import { z } from "zod";
import { userLoginSchema } from "./schema";

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IPatientSignUpRequest extends ILoginRequest {
    roles: string[];
}

export interface IUser {
    first_name: string;
    last_name: string;
}

export interface ILoginResponse {
    token: string;
    user: IUser;
}
export interface ILocalUser extends IUser {
    permission_list: Record<string, string[]>;
    roles: string[];
}


export type InputTypeLoginUser = z.infer<typeof userLoginSchema>;
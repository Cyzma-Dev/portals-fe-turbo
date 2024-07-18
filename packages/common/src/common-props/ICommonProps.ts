export interface ICommonProps {
  enableLoader: (loading: boolean) => void;
}

export interface IModalProps {
  openModal?: boolean;
  closeModal?: () => void;
}

export interface IResponse<T = any> {
	results: T
	state: string
	message: string
	count: number
  participants:any

}

export interface IPagedResponse<T> extends IResponse<T> {
  count: number;
}


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


export interface IToken {
  username: string;
  exp: number;
  permission_list: [];
  email: string;
  orig_iat: number;
}
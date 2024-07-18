import { BrowserUtility } from '../browser';
import { ILocalUser } from '../../common-props';
import { StorageConstant } from '../constants';

export class UserService {
	static getLocally(): ILocalUser | null {
		return BrowserUtility.getObj(StorageConstant.user);
	}

	static saveUser(user: ILocalUser) {
		BrowserUtility.saveObj(StorageConstant.user, user);
	}

	static saveToken(token: string) {
		BrowserUtility.save(StorageConstant.token, token);
	}

	static saveRefreshToken(refresh: string) {
		BrowserUtility.save(StorageConstant.refresh, refresh);
	}

	static isLoggedIn(): boolean {
		return !!UserService.getToken();
	}

	static getToken(): string {
		return BrowserUtility.get(StorageConstant.token) || '';
	}

	static getRefreshToken(): string {
		return BrowserUtility.get(StorageConstant.refresh) || '';
	}

	// static hasPermission(permission : string[]) : boolean {
	//   const user = this.getLocally();
	//   return (user?.permission_list || []).some(x => permission.includes(x)) || false;
	// }
	//   static hasPermission(permission : string[]) : boolean {
	//     const user = this.getLocally();
	//     return (user?.permission_list || []).some((x: any)=> permission.includes(x)) || false;
	//   }
}

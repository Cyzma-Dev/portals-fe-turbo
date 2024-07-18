import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import { ILoginRequest } from '../../pages/auth/login/presentation/types';
export class loginService {
	static login = async (data: ILoginRequest) => {
		const response = await BaseService.post<IResponse>(
			APIConstant.pharmacyLoginUrl,
			data,
			true
		);
		return response;
	};
}

import { BaseService } from './base'
import { APIConstant } from '../constants/api'
import { IResponse } from '../../common-props'
import { IChangePasswordRequest } from '../types'

export class ChangePasswordService {
	static changePassword = async (data: IChangePasswordRequest) => {
		const response = await BaseService.put<IResponse>(
			APIConstant.changePasswordUrlPost,
			data,
			true
		)
		return response
	}

	static checkIsTokenExpired = async (data: string) => {
		const response = await BaseService.get<IResponse>(
			APIConstant.changePasswordUrl + data,
			true
		)
		return response
	}
}

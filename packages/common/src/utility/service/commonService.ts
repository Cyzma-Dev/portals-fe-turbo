import { IPagedResponse } from '../../common-props';
import { APIConstant } from '../constants/api';
import { IOptions } from '../types';
import { BaseService } from './base';
export class CommonService {

	static getSubjectTypeOptions = async (): Promise<
		IPagedResponse<IOptions[]>
	> => {
		const response =
			(await BaseService.get<IPagedResponse<IOptions[]>>(
				APIConstant.subject_options,
				true
			)) || [];
		return response;
	};

}

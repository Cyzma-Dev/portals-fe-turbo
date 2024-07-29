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

	static getDocumentTypeOptions = async (): Promise<
		IPagedResponse<IOptions[]>
	> => {
		const response =
			(await BaseService.get<IPagedResponse<IOptions[]>>(
				APIConstant.document_type_options,
				true
			)) || [];
		return response;
	};

	static getAllergiesOptions = async (): Promise<IPagedResponse<IOptions[]>> => {
		const response = (await BaseService.get<IPagedResponse<IOptions[]>>(
			APIConstant.allergy_options_list,
			true
		)) || [];
		return response;
	};


	static getComorbidOptions = async (): Promise<IPagedResponse<IOptions[]>> => {
		const response = (await BaseService.get<IPagedResponse<IOptions[]>>(
			APIConstant.comorbid_options_list,
			true
		)) || [];
		return response;
	};

	static getHighRiskOptions = async (): Promise<IPagedResponse<IOptions[]>> => {
		const response = (await BaseService.get<IPagedResponse<IOptions[]>>(
			APIConstant.high_risk_options_list,
			true
		)) || [];
		return response;
	};

}




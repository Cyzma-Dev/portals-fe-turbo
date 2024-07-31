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


	static getAddressTypeOptions = async (): Promise<
		IPagedResponse<IOptions[]>
	> => {
		const response =
			(await BaseService.get<IPagedResponse<IOptions[]>>(
				APIConstant.address_type_options,
				true
			)) || [];
		return response;
	};



	static getStateList = async () => {
		const response = await BaseService.get<IPagedResponse<IOptions[]>>(
			APIConstant.state_list,
			true
		);
		return response;
	};



	static getCityList = async (stateId: number) => {
		const response = await BaseService.get<IPagedResponse<IOptions[]>>(
			APIConstant.city_list.replace('<int:stateId>', `${stateId}`),
			true
		);
		return response;
	};



	static getZipCodeList = async (cityId: number) => {
		const response = await BaseService.get<IPagedResponse<IOptions[]>>(
			APIConstant.zip_code_list.replace('<int:cityId>', `${cityId}`),
			true
		);
		return response;
	};

}




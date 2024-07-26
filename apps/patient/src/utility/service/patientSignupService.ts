import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import { IPatientSignupRequestTypes } from '../types/hook-types';

export class PatientSignUpService {
	static signUp = async (data: IPatientSignupRequestTypes) => {
		const response = await BaseService.post<IResponse>(
			APIConstant.create_patient_user,
			data,
			true
		);
		return response;
	};
}

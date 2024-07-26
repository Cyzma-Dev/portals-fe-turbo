import { IResponse } from '@repo/common/common-library';
import { BaseService } from '../../../../../packages/common/src/utility/service/base';
import { APIConstant } from '../../../../../packages/common/src/utility/constants';
import { IPatientVerification } from '../../pages/auth/stepper/verification/presentation/type';

export class PatientVerifyService {
	static patientVerify = async (data: IPatientVerification) => {
		const response = await BaseService.post<IResponse>(
			APIConstant.patientVerification,
			data,
			true
		);
		return response;
	};
}

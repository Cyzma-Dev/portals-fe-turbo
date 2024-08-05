import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import axios, { CancelTokenSource } from 'axios'; // Import CancelTokenSource
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';

export class PatientListingService {
	private static cancelToken: CancelTokenSource | null = null; // Maintain a single cancel token

	static getAllPatientData = async (search: string) => {
		const compress = lzStringCompressToBase64(search);
		const compressedString = encodeURIComponent(compress);

		if (PatientListingService.cancelToken) {
			PatientListingService.cancelToken.cancel(
				'Cancelling the previous request'
			);
		}

		PatientListingService.cancelToken = axios.CancelToken.source(); // Create or reset the cancel token
		const response = await BaseService.get<IResponse>(
			`${APIConstant.showPatientsListingData}${compressedString}`,
			true,
			PatientListingService.cancelToken.token
		);
		return response;
	};
	static getActivePatientList = async () => {
		try {
			const response = await BaseService.get<IResponse>(
				`${APIConstant.pharmacy_active_patient_user_list}`,
				true,
			);
			return response;
		} catch (error) {
			console.error('API request error:', error);
			return null;
		}
	};
}

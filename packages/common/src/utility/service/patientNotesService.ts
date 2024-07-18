import { BaseService } from './base';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
import axios, { CancelTokenSource } from 'axios';
import { APIConstant } from '../constants/api';
import { IResponse } from '../../common-props';
import { ICreatePatientNotes, IPatientNotes } from '../../pages/patient-notes/presentation/types';
export class PatientNotesService {
	private static cancelToken: CancelTokenSource | null = null;
	static getPatientNotes = async (patient_id: number, search: string) => {
		if (PatientNotesService.cancelToken) {
			PatientNotesService.cancelToken.cancel('Cancelling the previous request');
		}
		PatientNotesService.cancelToken = axios.CancelToken.source();

		const compress = lzStringCompressToBase64(search);
		const compressedString = encodeURIComponent(compress);
		const response = await BaseService.get<IResponse>(
			`${APIConstant.patientNotesList.replace(
				'<int:patient_id>',
				patient_id + ''
			)}${compressedString}`,
			true,
			PatientNotesService.cancelToken.token
		);
		return response;
	};

	static createPatientNote = async (requestData: ICreatePatientNotes) => {
		const response = await BaseService.post<IPatientNotes>(
			`${APIConstant.createPatient}`,
			requestData,
			true
		);
		return response;
	};

	static updatePatientNote = async (rec_id: number, requestData: ICreatePatientNotes) => {
		const response = await BaseService.put<IPatientNotes>(
			APIConstant.updatePatient.replace('<int:rec_id>', rec_id + ''),
			requestData,
			true
		);
		return response;
	};

	static deletePatientNotes = async (rec_id: number) => {
		const response = await BaseService.deleteMethod<IPatientNotes>(
			APIConstant.deleteNotes.replace('<int:rec_id>', rec_id + ''),
			true
		);
		return response;
	};
}

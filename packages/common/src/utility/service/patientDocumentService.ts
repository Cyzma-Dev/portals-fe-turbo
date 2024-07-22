
import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
import { ICreatePatientDocument, IPatientDocument, IUploadDocument } from '../../pages/documents/presentation';
export class PatientDocumentsService {
	private static cancelToken: CancelTokenSource | null = null;
	static uploadPatientDocument = async (
		requestData: any,
		patient_id: number,
		contentType: any
	) => {
		const response = await BaseService.post<ICreatePatientDocument>(
			`${APIConstant.upload_document.replace(
				'<int:patient_id>',
				patient_id + ''
			)}`,
			requestData,
			true,
			contentType
		);
		return response;
	};

	static getPatientDocuments = async (patient_id: number, search: string) => {
		if (PatientDocumentsService.cancelToken) {
			PatientDocumentsService.cancelToken.cancel(
				'Cancelling the previous request'
			);
		}

		PatientDocumentsService.cancelToken = axios.CancelToken.source();
		const compress = lzStringCompressToBase64(search);
		const compressedString = encodeURIComponent(compress);
		const response = await BaseService.get<IResponse>(
			`${APIConstant.get_documents_api.replace(
				'<int:patient_id>',
				patient_id + ''
			)}${compressedString}`,
			true,
			PatientDocumentsService.cancelToken.token
		);
		return response;
	};

	static getPatientDocument = async (
		documentId: number
	): Promise<IResponse<IUploadDocument>> => {
		const response = await BaseService.get<IResponse<IUploadDocument>>(
			`${APIConstant.get_update_document.replace(
				'<int:document_id>',
				documentId + ''
			)}`,
			true
		);
		return response;
	};

	static updatePatientDocument = async (doc_id: number, requestData: any) => {
		const response = await BaseService.put<IPatientDocument>(
			APIConstant.get_update_document.replace('<int:document_id>', doc_id + ''),
			requestData,
			true
		);
		return response;
	};

	static deletePatientDocument = async (rec_id: number) => {
		const response = await BaseService.deleteMethod<ICreatePatientDocument>(
			APIConstant.delete_document.replace('<int:document_id>', rec_id + ''),
			true
		);
		return response;
	};
}

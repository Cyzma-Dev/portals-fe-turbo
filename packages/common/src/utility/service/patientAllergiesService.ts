import { IResponse } from "../../common-props";
import { APIConstant } from "../constants";
import { BaseService } from "./base";
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
export class PatientAllergiesService {
    private static cancelToken: CancelTokenSource | null = null;
    static getPatientAllergies = async (patient_id: number, search: string) => {
        if (PatientAllergiesService.cancelToken) {
            PatientAllergiesService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }
        PatientAllergiesService.cancelToken = axios.CancelToken.source();
        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);
        const response = await BaseService.get<IResponse>(
            `${APIConstant.get_patient_allergies.replace(
                '<int:patient_id>',
                patient_id + ''
            )}${compressedString}`,
            true,
            PatientAllergiesService.cancelToken.token
        );
        return response;
    };

    static createPatientAllergies = async (requestData: any) => {
        const response = await BaseService.post<IResponse>(
            `${APIConstant.create_patient_allergy}`,
            requestData,
            true
        );
        return response;
    };

    static updatePatientAllergies = async (rec_id: number, requestData: any) => {
        const response = await BaseService.put<IResponse>(
            APIConstant.update_patient_allergy.replace('<int:rec_id>', rec_id + ''),
            requestData,
            true
        );
        return response;
    };

    static deletePatientAllergies = async (rec_id: number) => {
        const response = await BaseService.deleteMethod<IResponse>(
            APIConstant.delete_patient_allergy.replace('<int:rec_id>', rec_id + ''),
            true
        );
        return response;
    };
}

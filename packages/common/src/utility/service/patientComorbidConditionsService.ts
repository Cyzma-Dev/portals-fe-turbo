import { IResponse } from "../../common-props";
import { APIConstant } from "../constants";
import { BaseService } from "./base";
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
export class PatientComorbidConditionsService {
    private static cancelToken: CancelTokenSource | null = null;
    static getPatientComorbidConditions = async (patient_id: number, search: string) => {
        if (PatientComorbidConditionsService.cancelToken) {
            PatientComorbidConditionsService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }
        PatientComorbidConditionsService.cancelToken = axios.CancelToken.source();
        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);
        const response = await BaseService.get<IResponse>(
            `${APIConstant.get_patient_comrobid_conditions.replace(
                '<int:patient_id>',
                patient_id + ''
            )}${compressedString}`,
            true,
            PatientComorbidConditionsService.cancelToken.token
        );
        return response;
    };

    static createPatientComorbidConditions = async (requestData: any) => {
        const response = await BaseService.post<IResponse>(
            `${APIConstant.create_patient_comorbid_conditions}`,
            requestData,
            true
        );
        return response;
    };

    static updatePatientComorbidConditions = async (
        rec_id: number,
        requestData: any
    ) => {
        const response = await BaseService.put<IResponse>(
            APIConstant.update_patient_comorbid_conditions.replace(
                '<int:rec_id>',
                rec_id + ''
            ),
            requestData,
            true
        );
        return response;
    };

    static deletePatientComorbidConditions = async (rec_id: number) => {
        const response = await BaseService.deleteMethod<IResponse>(
            APIConstant.delete_patient_comorbid_conditions.replace(
                '<int:rec_id>',
                rec_id + ''
            ),
            true
        );
        return response;
    };
}

import { IResponse } from "../../common-props";
import { APIConstant } from "../constants";
import { BaseService } from "./base";
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
export class PatientHighRiskConditionsService {
    private static cancelToken: CancelTokenSource | null = null;
    static getPatientHighRiskConditions = async (patient_id: number, search: string) => {
        if (PatientHighRiskConditionsService.cancelToken) {
            PatientHighRiskConditionsService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }
        PatientHighRiskConditionsService.cancelToken = axios.CancelToken.source();
        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);
        const response = await BaseService.get<IResponse>(
            `${APIConstant.get_patient_high_risk_conditions.replace(
                '<int:patient_id>',
                patient_id + ''
            )}${compressedString}`,
            true,
            PatientHighRiskConditionsService.cancelToken.token
        );
        return response;
    };

    static createPatientHighRiskConditions = async (requestData: any) => {
        const response = await BaseService.post<IResponse>(
            `${APIConstant.create_high_risk_conditions}`,
            requestData,
            true
        );
        return response;
    };

    static updatePatientHighRiskConditions = async (
        rec_id: number,
        requestData: any
    ) => {
        const response = await BaseService.put<IResponse>(
            APIConstant.update_high_risk_conditions.replace(
                '<int:rec_id>',
                rec_id + ''
            ),
            requestData,
            true
        );
        return response;
    };

    static deletePatientHighRiskConditions = async (rec_id: number) => {
        const response = await BaseService.deleteMethod<IResponse>(
            APIConstant.delete_high_risk_conditions.replace(
                '<int:rec_id>',
                rec_id + ''
            ),
            true
        );
        return response;
    };
}

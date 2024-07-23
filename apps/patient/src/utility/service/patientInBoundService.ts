import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
import { IInBoundServiceProps } from '../../pages/patient-InBound';


export class PatientInBoundService {
    private static cancelToken: CancelTokenSource | null = null;
    static getInBoundList = async (patientID: number, search: string): Promise<any> => {
        if (PatientInBoundService.cancelToken) {
            PatientInBoundService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }

        PatientInBoundService.cancelToken = axios.CancelToken.source();

        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);

        const response = await BaseService.get<IResponse<IInBoundServiceProps[]>>(
            `${APIConstant.patient_inbound_list.replace(
                '<int:patient_id>',
                patientID + ''
            )}${compressedString}`,
            true,
            PatientInBoundService.cancelToken.token
        ) || [];
        return response;
    };
}

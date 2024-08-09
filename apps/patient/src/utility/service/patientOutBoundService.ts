
import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
import { IOutBoundList } from '../../pages';

export class PatientOutBoundService {
    private static cancelToken: CancelTokenSource | null = null;
    static getOutboundList = async (patientID: number, search: string): Promise<any> => {
        if (PatientOutBoundService.cancelToken) {
            PatientOutBoundService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }
        PatientOutBoundService.cancelToken = axios.CancelToken.source();

        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);

        const response = await BaseService.get<IResponse<IOutBoundList[]>>(
            `${APIConstant.patient_outbound_list.replace(
                '<int:patient_id>',
                patientID + ''
            )}${compressedString}`,
            true,
            PatientOutBoundService.cancelToken.token
        ) || [];
        return response;
    };

    static getTemplateData = async (
        templateRecordId: string
    ): Promise<IResponse<IOutBoundList>> => {
        const response = await BaseService.get<IResponse<IOutBoundList>>(
            `${APIConstant.patient_inbound_list.replace(
                '<str:rec_id>',
                templateRecordId + ''
            )}`,
            true
        );
        return response;
    };

}

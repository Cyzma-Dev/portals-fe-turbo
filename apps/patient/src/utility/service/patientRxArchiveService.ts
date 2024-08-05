import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
import axios, { CancelTokenSource } from 'axios';
// import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';


export class PatientRxArchiveService {
    private static cancelToken: CancelTokenSource | null = null;
    static getRxArchiveList = async (patientID: number, search: string): Promise<any> => {
        if (PatientRxArchiveService.cancelToken) {
            PatientRxArchiveService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }

        PatientRxArchiveService.cancelToken = axios.CancelToken.source();

        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);

        const response = await BaseService.get<IResponse>(
            `${APIConstant.patient_Archive_list.replace(
                '<int:patient_id>',
                patientID + ''
            )}${compressedString}`,
            true,
            PatientRxArchiveService.cancelToken.token
        ) || [];
        return response;
    };



}

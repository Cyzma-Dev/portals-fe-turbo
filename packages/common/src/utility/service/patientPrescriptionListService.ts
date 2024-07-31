import { IResponse } from '../../';
import { BaseService } from './base';
import { APIConstant } from '../constants';
import axios, { CancelTokenSource } from 'axios';
import { compressToBase64 as lzStringCompressToBase64 } from 'lz-string';
export class PatientPrescriptionListService {
    private static cancelToken: CancelTokenSource | null = null;
    static getPrescriptions = async (patient_id: number, search: string) => {
        if (PatientPrescriptionListService.cancelToken) {
            PatientPrescriptionListService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }
        PatientPrescriptionListService.cancelToken = axios.CancelToken.source();
        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);
        const response = await BaseService.get<IResponse>(
            `${APIConstant.prescriptions.replace(
                '<int:patient_id>',
                patient_id + ''
            )}${compressedString}`,
            true
            // PrescriptionListService.cancelToken.token
        );
        return response;
    };

    static getExpiringPrescriptions = async (patient_id: number, search: string) => {
        if (PatientPrescriptionListService.cancelToken) {
            PatientPrescriptionListService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }

        PatientPrescriptionListService.cancelToken = axios.CancelToken.source();
        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);
        const response = await BaseService.get<IResponse>(
            `${APIConstant.expiring_prescriptions.replace(
                '<int:patient_id>',
                patient_id + ''
            )}${compressedString}`,
            true
            // PrescriptionListService.cancelToken.token
        );
        return response;
    };

    static getExpiredPrescriptions = async (patient_id: number, search: string) => {
        const patient_info: any = localStorage.getItem("patient_info");
        const pharmacy_info: any = localStorage.getItem("pharmacy_info");
        const physician_info: any = localStorage.getItem("physician_info");
        const user_info = patient_info ? JSON.parse(patient_info) : pharmacy_info ? JSON.parse(pharmacy_info) : JSON.parse(physician_info);
        const role = user_info?.roles;
        if (PatientPrescriptionListService.cancelToken) {
            PatientPrescriptionListService.cancelToken.cancel(
                'Cancelling the previous request'
            );
        }
        PatientPrescriptionListService.cancelToken = axios.CancelToken.source();
        const compress = lzStringCompressToBase64(search);
        const compressedString = encodeURIComponent(compress);
        const response = await BaseService.get<IResponse>(
            `${APIConstant.expired_prescriptions.replace(
                '<int:patient_id>',
                patient_id + ''
            ).replace('<str:role>', role)}${compressedString}`,
            true
            // PrescriptionListService.cancelToken.token
        );
        return response;
    };
}

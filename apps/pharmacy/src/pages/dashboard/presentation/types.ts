export interface IDashboardCount {
    expired_prescriptions: number;
    expiring_prescriptions: number;
    latest_patient_import: string;
    latest_rx_import: string;
    patient_enrollments: number;
    pharmacy_inbounds: number;
    total_prescriptions: number;
}
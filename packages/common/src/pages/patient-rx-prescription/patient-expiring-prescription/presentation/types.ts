export interface IPatientExpiringPrescription {
    days_supply: number;
    drug_name: string;
    expiration_date: string;
    id: number;
    is_active: boolean;
    last_fill_date: string;
    ndc: string;
    next_fill_date: string;
    patient: number;
    patient_name: string;
    pharmacy: number;
    pharmacy_name: string;
    pharmacy_note: string | null;
    physician: number;
    physician_name: string;
    refill_remaining: number;
    refill_request_status: string | null;
    remaining_quantity: number;
    rx_fills: any[]; // Specify the actual type if known
    rx_number: string;
    rx_request_status: string | null;
    times_filled: string;
    written_date: string;
    written_quantity: number;
    written_refills: number;
}

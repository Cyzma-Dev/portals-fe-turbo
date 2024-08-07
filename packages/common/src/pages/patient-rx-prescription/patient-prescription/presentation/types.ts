import { IOptions } from "@repo/ui/shadcn";

export interface IPatientPrescription {
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


export interface IRequestData {
    address: number;
    rx: number;
    needed_date: string;
    patient_note?: string; // Optional patient_note property
}

export type IRequestRefill = IRequestData[];



export interface IRequestRefillCommonProps {
    // isEdit: boolean
    // setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    handlePrescriptionRequestSubmit: (formData: IRequestRefill) => void
    isBtnDisable: boolean
    isLoading: boolean
    sheetOpen: boolean
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
    openSheet: () => void
    currentPrescription: IPatientPrescription[]
    setCurrentPrescription: React.Dispatch<React.SetStateAction<IPatientPrescription>>
}

export interface IActiveAddressOptions extends IOptions {
    address_type_name?: string;
}

export interface IAddNewAddressProps {
    addNewAddressSheetOpen: boolean
    setNewAddressSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
    newAddressBtnDisable: boolean
    newAddressLoading: boolean
}

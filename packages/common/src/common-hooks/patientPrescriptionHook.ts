import { useEffect, useState } from "react";
import { IQueryString, MessageConstant, PatientPrescriptionListService } from "../utility";
import { toast } from "sonner";
import { apiCallTime } from "../helper-methods";
import { IPatientPrescription } from "../pages/patient-rx-prescription/patient-prescription";

export const PrescriptionListHook = (patient_id: number) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [prescriptionData, setPrescriptionData] = useState<IPatientPrescription[] | []>([]);
    const [gridCount, setGridCount] = useState(0);
    const [queryString, setQueryString] = useState<IQueryString>({
        filter: {
            filters: [],
            logic: 'and',
        },
        skip: 0,
        take: 10,
    });

    const PrescriptionList = async (patient_id: number, search: IQueryString) => {
        try {
            setError('');
            setIsLoading(true);
            const result = await PatientPrescriptionListService.getPrescriptions(patient_id, JSON.stringify(search));
            setPrescriptionData(result.results);
            setGridCount(result?.count);
        } catch (error: any) {
            error?.data?.error && toast.error(error?.data?.error);
            error?.data?.message && toast.error(error?.data?.message);
            setError(error?.data?.message || MessageConstant.commonFailureMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        PrescriptionList(patient_id, queryString);
        const intervalCall = setInterval(() => {
            PrescriptionList(patient_id, queryString);
        }, apiCallTime);
        return () => clearInterval(intervalCall);
    }, [patient_id, queryString.skip, queryString.filter.filters, queryString.take]);

    return {
        isLoading,
        setIsLoading,
        prescriptionData,
        error,
        queryString,
        setQueryString,
        gridCount,
        PrescriptionList
    };
};

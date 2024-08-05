import { useEffect, useState } from "react";
import { IQueryString, MessageConstant, PatientPrescriptionListService } from "../utility";
import { toast } from "sonner";
import { apiCallTime } from "../helper-methods";

export const ExpiredPrescriptionListHook = (patient_id: number) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [expiredPrescriptionData, setExpiredPrescriptionData] = useState(null);
    const [gridCount, setGridCount] = useState(0);
    const [queryString, setQueryString] = useState<IQueryString>({
        filter: {
            filters: [],
            logic: 'and',
        },
        skip: 0,
        take: 10,
    });

    const ExpiredPrescriptionList = async (patient_id: number, search: IQueryString) => {
        try {
            setError('');
            setIsLoading(true);
            const result = await PatientPrescriptionListService.getExpiredPrescriptions(
                patient_id, JSON.stringify(search)
            );
            setExpiredPrescriptionData(result.results);
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
        ExpiredPrescriptionList(patient_id, queryString);
        const intervalCall = setInterval(() => {
            ExpiredPrescriptionList(patient_id, queryString);
        }, apiCallTime);
        return () => clearInterval(intervalCall);
    }, [patient_id, queryString.skip, queryString.filter.filters, queryString.take]);

    return {
        isLoading,
        expiredPrescriptionData,
        error,
        queryString,
        setQueryString,
        gridCount,
        setIsLoading,
    };
};

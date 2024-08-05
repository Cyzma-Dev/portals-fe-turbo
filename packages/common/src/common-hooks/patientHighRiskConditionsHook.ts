import { useEffect, useState } from "react";
import { IQueryString, MessageConstant, PatientHighRiskConditionsService } from "../utility";
import { toast } from "sonner";
import { apiCallTime } from "../helper-methods";


export const PatientHighRiskConditionsHook = (patientId: number) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [patientHighRiskData, setPatientHighRiskData] = useState(null);
    const [gridCount, setGridCount] = useState(0);
    const [queryString, setQueryString] = useState<IQueryString>({
        filter: {
            filters: [],
            logic: 'and',
        },
        skip: 0,
        take: 10,
    });
    const fetchPatientHighRiskData = async (patientId: number, search: IQueryString) => {
        try {
            setError("");
            setIsLoading(true);
            const result = await PatientHighRiskConditionsService.getPatientHighRiskConditions(patientId, JSON.stringify(search));
            //   const idsToExclude = result?.results.map((item: any) => item.condition_value_id);
            setPatientHighRiskData(result?.results);
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
        fetchPatientHighRiskData(patientId, queryString);
        const intervalCall = setInterval(() => {
            fetchPatientHighRiskData(patientId, queryString);
        }, apiCallTime);
        return () => clearInterval(intervalCall);
    }, [patientId, queryString.skip, queryString.filter.filters, queryString.take]);
    return {
        isLoading, patientHighRiskData, fetchPatientHighRiskData, error, setIsLoading, queryString,
        setQueryString,
        gridCount
    };
};

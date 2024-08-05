import { useEffect, useState } from "react";
import { PatientRxArchiveService } from "../utility";
import { IQueryString, MessageConstant } from "@repo/common/common-library";
import { toast } from "sonner";
import { apiCallTime } from "../../../../packages/common/src/helper-methods";




export const PatientRxArchiveHook = (patientId: number) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [RxArchiveListData, setRxArchiveListData] = useState(null);
    const [gridCount, setGridCount] = useState(0);
    const [queryString, setQueryString] = useState<IQueryString>({
        filter: {
            filters: [],
            logic: 'and',
        },
        skip: 0,
        take: 10,
    });
    const fetchPatientRxArchiveList = async (patientId: number | any, search: IQueryString) => {

        try {
            setError('');
            setLoading(true);
            const result = await PatientRxArchiveService.getRxArchiveList(
                patientId,
                JSON.stringify(search)
            );
            setRxArchiveListData(result.results);
            setGridCount(result?.count);
        } catch (error: any) {
            error?.data?.error && toast.error(error?.data?.error);
            error?.data?.message && toast.error(error?.data?.message);
            setError(error?.data?.message || MessageConstant.commonFailureMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientRxArchiveList(patientId, queryString);
        const intervalCall = setInterval(() => {
            fetchPatientRxArchiveList(patientId, queryString);
        }, apiCallTime);
        return () => clearInterval(intervalCall);
    }, [patientId, queryString.skip, queryString.filter.filters, queryString.take]);


    return {
        loading,
        RxArchiveListData,
        fetchPatientRxArchiveList,
        error,
        setLoading,
        queryString,
        setQueryString,
        gridCount,
    };
};

import { IQueryString, MessageConstant } from "@repo/common/common-library";
import { useEffect, useState } from "react";
import { PatientInBoundService } from "../utility";
import { toast } from "sonner";
import { apiCallTime } from "../../../../packages/common/src/helper-methods";




export const PatientInBoundHook = (patientId: number) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [inBoundListData, setInBoundListData] = useState(null);
    const [gridCount, setGridCount] = useState(0);
    const [queryString, setQueryString] = useState<IQueryString>({
        filter: {
            filters: [],
            logic: 'and',
        },
        skip: 0,
        take: 10,
    });
    const fetchInboundList = async (patientId: number | any, search: IQueryString) => {

        try {
            setError('');
            setLoading(true);
            const result = await PatientInBoundService.getInBoundList(
                patientId,
                JSON.stringify(search)
            );
            setInBoundListData(result.results);
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
        fetchInboundList(patientId, queryString);
        const intervalCall = setInterval(() => {
            fetchInboundList(patientId, queryString);
        }, apiCallTime);
        return () => clearInterval(intervalCall);
    }, [patientId, queryString.skip, queryString.filter.filters, queryString.take]);


    return {
        loading,
        inBoundListData,
        fetchInboundList,
        error,
        setLoading,
        queryString,
        setQueryString,
        gridCount,
    };
};

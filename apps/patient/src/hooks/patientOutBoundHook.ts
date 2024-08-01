import { IQueryString, MessageConstant } from "@repo/common/common-library";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiCallTime } from "../../../../packages/common/src/helper-methods";
import { PatientOutBoundService } from "../utility";

export const PatientOutboundHook = (patientId: number) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [outBoundListData, setOutBoundListData] = useState(null);
    const [gridCount, setGridCount] = useState(0);
    const [queryString, setQueryString] = useState<IQueryString>({
        filter: {
            filters: [],
            logic: 'and',
        },
        skip: 0,
        take: 10,
    });
    const fetchOutboundList = async (patientId: number | any, search: IQueryString) => {
        try {
            setError('');
            setLoading(true);
            const result = await PatientOutBoundService.getOutboundList(
                patientId,
                JSON.stringify(search)
            );
            setOutBoundListData(result.results);
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
        fetchOutboundList(patientId, queryString);
        const intervalCall = setInterval(() => {
            fetchOutboundList(patientId, queryString);
        }, apiCallTime);
        return () => clearInterval(intervalCall);
    }, [patientId, queryString.skip, queryString.filter.filters, queryString.take]);


    return {
        loading,
        outBoundListData,
        fetchOutboundList,
        error,
        setLoading,
        queryString,
        setQueryString,
        gridCount,
    };
};

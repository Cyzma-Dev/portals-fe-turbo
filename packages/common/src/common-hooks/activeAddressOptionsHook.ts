import { useState } from "react";
import { IActiveAddressOptions } from "../pages";
import { CommonService } from "../utility/service/commonService";

export const ActiveAddressOptionsHook = (patientId: number) => {
    const [loading, setLoading] = useState(true);
    const [activeAddressOptions, setActiveAddressOptions] = useState<IActiveAddressOptions[]>([]);

    const fetchAddressList = async (patientId: number) => {
        try {
            setLoading(true);
            const result = await CommonService.getActiveAddressOptions(patientId);
            setActiveAddressOptions(result.results);
        } catch (error) {
            console.log("Error =", error);
        } finally {
            setLoading(false);
        }
    };

    return { activeAddressOptions, fetchAddressList, loading };
};

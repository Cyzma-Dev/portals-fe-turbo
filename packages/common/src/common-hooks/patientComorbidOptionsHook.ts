import { useState } from "react";
import { IOptions } from "../utility";
import { CommonService } from "../utility/service/commonService";

export const PatientComorbidOptionsHook = () => {
    const [loading, setLoading] = useState(true);
    const [patientComorbidOptionsData, setPatientComorbidOptionsData] = useState<IOptions[]>([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await CommonService.getComorbidOptions();
            setPatientComorbidOptionsData(result?.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { patientComorbidOptionsData, fetchData, loading };
};

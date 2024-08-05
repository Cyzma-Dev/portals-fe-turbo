import { useState } from "react";
import { CommonService } from "../utility/service/commonService";
import { IOptions } from "../utility";

export const PatientHighRiskOptionsHook = () => {
    const [loading, setLoading] = useState(true);
    const [patientHighRiskOptionsData, setPatientHighRiskOptionsData] = useState<IOptions[]>([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await CommonService.getHighRiskOptions();
            setPatientHighRiskOptionsData(result?.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { patientHighRiskOptionsData, fetchData, loading };
};

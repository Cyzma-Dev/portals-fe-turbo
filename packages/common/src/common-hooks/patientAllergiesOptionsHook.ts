import { useState } from "react";
import { IOptions } from "../utility";
import { CommonService } from "../utility/service/commonService";

export const PatientAllergiesOptionsHook = () => {
    const [loading, setLoading] = useState(true);
    const [patientAllergiesOptionsData, setPatientAllergiesOptionsData] = useState<IOptions[]>([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await CommonService.getAllergiesOptions();
            setPatientAllergiesOptionsData(result?.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { patientAllergiesOptionsData, fetchData, loading };
};

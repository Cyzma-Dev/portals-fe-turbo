import React from "react";
import { PatientAllergiesContainer } from "./patientAllergies";
import { PatientComorbidContainer } from "./patient-comorbid-conditions";
import { PatientHighRiskContainer } from "./patient-high-risk-condition";
export const PatientClinicalConditionsContainer = () => {


    return (
        <>
            <PatientAllergiesContainer />
            <PatientComorbidContainer />
            <PatientHighRiskContainer />
        </>
    );
};

import React from "react";
import { PatientAllergiesContainer } from "./patientAllergies";
import { PatientComorbidContainer } from "./patient-comorbid-conditions";
import { PatientHighRiskContainer } from "./patient-high-risk-condition";
import { Separator } from "@repo/ui/shadcn";
export const PatientClinicalConditionsContainer = () => {


    return (
        <div>
            <PatientAllergiesContainer />
            <Separator className="mb-4"/>
            <PatientComorbidContainer />
            <Separator className="mb-4"/>
            <PatientHighRiskContainer />
        </div>
    );
};

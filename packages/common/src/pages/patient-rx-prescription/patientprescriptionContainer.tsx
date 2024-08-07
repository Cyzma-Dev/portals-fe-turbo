import React from "react";
import { PatientExpiringPrescriptionContainer } from "./patient-expiring-prescription";
import { PatientExpiredPrescriptionContainer } from "./patient-expired-prescription";
import { PrescriptionContainer } from "./patient-prescription";

export const PatientPrescriptionContainer = () => {


    return (
        <>
            <PrescriptionContainer />
            <PatientExpiringPrescriptionContainer />
            <PatientExpiredPrescriptionContainer />
        </>
    );
};

import React from "react";
import { PatientExpiringPrescriptionContainer } from "./patient-expiring-prescription";
import { PatientExpiredPrescriptionContainer } from "./patient-expired-prescription";

export const PatientPrescriptionContainer = () => {


    return (
        <>
            <PatientExpiringPrescriptionContainer />
            <PatientExpiredPrescriptionContainer />
        </>
    );
};

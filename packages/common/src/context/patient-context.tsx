import React, { createContext, useEffect, useState } from "react";

// Define the patient type
export interface Patient {
  user_id: number;
  chat_profile_id: string;
  patient_id: number;
  first_name: string;
  last_name: string;
  roles: string;
  //We will add more fields as required
}

// Create the patient context
interface PatientContextProps {
  patient_data: Patient;
  children?: JSX.Element | JSX.Element[];
  setPatient?: (patient: Patient) => void;
}

export const PatientContext = createContext<PatientContextProps>({
  patient_data: {
    user_id: 0,
    chat_profile_id: '',
    patient_id: 0,
    first_name: '',
    last_name: '',
    roles: '',
    //We will add more fields as required
  },
  setPatient: () => { },
});

// Create the provider component
interface IPatientProvider {
  children: React.ReactNode;
}

export const PatientProvider = ({ children }: IPatientProvider) => {
  const [patient_data, setPatient] = useState<Patient>({
    user_id: 0,
    chat_profile_id: '',
    patient_id: 0,
    first_name: '',
    last_name: '',
    roles: '',
  });


  const setContextDetails = () => {
    let local_patient_data: any = localStorage.getItem("patient_info");

    local_patient_data = JSON.parse(local_patient_data);

    setPatient(local_patient_data);
    setPatient(local_patient_data);
  };

  useEffect(() => {
    setContextDetails();
  }, []);

  return (
    <PatientContext.Provider value={{ patient_data, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

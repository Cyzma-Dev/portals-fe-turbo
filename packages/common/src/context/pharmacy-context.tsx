import React, { createContext, useEffect, useState } from "react";

// Define the patient type
export interface Pharmacy {
  user_id: number;
  chat_profile_id: string,
  first_name: string;
  last_name: string;
  roles: string;
  work_space: string;
  //We will add more fields as required
}

// Create the patient context
interface PharmacyContextProps {
  pharmacy_data: Pharmacy;
  children?: JSX.Element | JSX.Element[];
  setPharmacy?: (pharmacy: any) => void;
}

export const PharmacyContext = createContext<PharmacyContextProps>({
  pharmacy_data: {
    user_id: 0,
    chat_profile_id: '',
    first_name: '',
    last_name: '',
    roles: '',
    work_space: '',
  },
  setPharmacy: () => { },
});

// Create the provider component
export const PharmacyProvider = ({ children }: any) => {
  const [pharmacy_data, setPharmacy] = useState<Pharmacy>({
    user_id: 0,
    chat_profile_id: '',
    first_name: '',
    last_name: '',
    roles: '',
    work_space: '',

  });

  const setContextDetails = () => {
    let local_patient_data: any = localStorage.getItem("pharmacy_info");

    local_patient_data = JSON.parse(local_patient_data);

    setPharmacy(local_patient_data);
    setPharmacy(local_patient_data);
  };

  useEffect(() => {
    setContextDetails();
  }, []);

  return (
    <PharmacyContext.Provider value={{ pharmacy_data, setPharmacy }}>
      {children}
    </PharmacyContext.Provider>
  );
};

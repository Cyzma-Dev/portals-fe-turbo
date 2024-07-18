import React, { createContext, useEffect, useState } from "react";

// Define the patient type
export interface Physician {
  user_id: number;
  chat_profile_id: string;
  first_name: string;
  last_name: string;
  roles: string;
  work_space: string;
  notification_indicator: number;

  //We will add more fields as required
}

// Create the patient context
interface PhysicianContextProps {
  physician_data: Physician;
  children?: JSX.Element | JSX.Element[];
  setPhysician?: (Physician: any) => void;

}

export const PhysicianContext = createContext<PhysicianContextProps>({
  physician_data: {
    user_id: 0,
    chat_profile_id: '',
    first_name: '',
    last_name: '',
    roles: '',
    work_space: '',
    notification_indicator: 0,
  },
  setPhysician: () => { },
}
);

// Create the provider component
export const PhysicianProvider = ({ children }: any) => {
  const [physician_data, setPhysician] = useState<Physician>({
    user_id: 0,
    chat_profile_id: '',
    first_name: '',
    last_name: '',
    roles: '',
    work_space: '',
    notification_indicator: 0,
  });

  const setContextDetails = () => {
    let local_physician_data: any = localStorage.getItem("physician_info");

    local_physician_data = JSON.parse(local_physician_data);

    setPhysician(local_physician_data);
    setPhysician(local_physician_data);
  };

  useEffect(() => {
    setContextDetails();
  }, []);

  return (
    <PhysicianContext.Provider value={{ physician_data, setPhysician }}>
      {children}
    </PhysicianContext.Provider>
  );
};
import React, { createContext, useState } from "react";

interface Notification {
    messageNotifications: any;
    setMessageNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

export const NotificationContext = createContext<Notification>({
    messageNotifications: {},
    setMessageNotifications: () => { }
});

// Create the provider component
export const NotificationProvider = ({ children }: any) => {
    const [messageNotifications, setMessageNotifications] = useState<any>({});


    return (
        <NotificationContext.Provider value={{ messageNotifications, setMessageNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

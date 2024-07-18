import { useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Icons } from "@repo/ui/shadcn";
import { IDashboardCount } from './types';
import { NotificationContext } from '@repo/common/common-library';

interface IDashboardProps{
    dashboardCount: IDashboardCount
}

const DashboardScreen = (props: IDashboardProps) => {
	const { messageNotifications } = useContext(NotificationContext);

    useEffect(() => {
    }, []);

    return (
    <div className="flex-col align-start space-y-4 h-full">
        <div className='flex'>
            <h2 className="inline-block text-lg justify-self-start font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {props.dashboardCount?.patient_enrollments &&
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                        Patient Enrollments
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        className="h-4 w-4 text-blue"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">+{props.dashboardCount?.patient_enrollments}</div>
                    <p className="text-xs text-muted-foreground">
                        total enrolled patients
                    </p>
                    </CardContent>
                </Card>
            }
            {props.dashboardCount?.physician_inbounds &&
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                        Rx Renewals
                    </CardTitle>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevrons-down text-green"
                    >
                        <path d="m7 6 5 5 5-5"/>
                        <path d="m7 13 5 5 5-5"/>
                    </svg>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold flex items-center"><Icons.arrowDownUp className='h-4 w-4'/>{props.dashboardCount?.physician_inbounds}</div>
                    <p className="text-xs text-muted-foreground">
                        need to process this renewals
                    </p>
                    </CardContent>
                </Card>
            }
            {messageNotifications?.total_notifications &&
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">Unread Messages</CardTitle>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="lucide lucide-message-square-dashed text-orange"
                    >
                        <path d="M3 6V5c0-1.1.9-2 2-2h2"/>
                        <path d="M11 3h3"/>
                        <path d="M18 3h1c1.1 0 2 .9 2 2"/>
                        <path d="M21 9v2"/>
                        <path d="M21 15c0 1.1-.9 2-2 2h-1"/>
                        <path d="M14 17h-3"/>
                        <path d="m7 17-4 4v-5"/>
                        <path d="M3 12v-2"/>
                    </svg>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{messageNotifications?.total_notifications}</div>
                    <p className="text-xs text-muted-foreground">
                        total unread messages
                    </p>
                    </CardContent>
                </Card>
            }
        </div>
    </div>
    );
};

export default DashboardScreen;
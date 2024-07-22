import { PharmacyContext } from "@repo/common/common-library";
import DashboardScreen from "../presentation/dashboard";
import { useContext, useEffect } from "react";
import { DashboardCountHook } from "../../../hooks/dashboardHook";
import { apiCallTime } from "../../../../../../packages/common/src/helper-methods";
import { DocumentSkeleton } from "../presentation/skeleton";
import { QuiteHere } from "@repo/ui/shadcn";

export const DashboardContainer = () => {
    const { pharmacy_data } = useContext(PharmacyContext)
    
    const { isLoading, dashboardCount, fetchData } = DashboardCountHook();

    useEffect(() => {
		fetchData(pharmacy_data.user_id);

		const intervalCall = setInterval(() => {
			fetchData(pharmacy_data.user_id);
		}, apiCallTime);
		
		return () => clearInterval(intervalCall);
	
	}, []);


    return (
        isLoading 
        ?
            <DocumentSkeleton/>
        :
            dashboardCount
            ?
                <DashboardScreen
                    isLoading={isLoading}
                    dashboardCount={dashboardCount}
                />
            :
            <QuiteHere/>
    );
}


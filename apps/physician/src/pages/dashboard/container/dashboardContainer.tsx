import { useContext, useEffect } from "react";
import { DashboardCountHook } from "../../../hooks/dashboardHook";
import DashboardScreen from "../presentation/dashboard";
import { PhysicianContext } from "@repo/common/common-library";
import { apiCallTime } from "../../../../../../packages/common/src/helper-methods";
import { QuiteHere } from "@repo/ui/shadcn";
import { DocumentSkeleton } from "../presentation/skeleton";

export const DashboardContainer = () => {
    const { physician_data } = useContext(PhysicianContext)
    const { isLoading, dashboardCount, fetchData } = DashboardCountHook();

    useEffect(() => {
		fetchData(physician_data.user_id);

		const intervalCall = setInterval(() => {
			fetchData(physician_data.user_id);
		}, apiCallTime);
		
		return () => clearInterval(intervalCall);
	
	}, [physician_data.work_space]);
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


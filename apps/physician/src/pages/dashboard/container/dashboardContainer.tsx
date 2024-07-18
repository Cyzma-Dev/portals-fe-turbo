import { useContext, useEffect } from "react";
import { DashboardCountHook } from "../../../hooks/dashboardHook";
import DashboardScreen from "../presentation/dashboard";
import { PhysicianContext } from "@repo/common/common-library";
import { apiCallTime } from "../../../../../../packages/common/src/helper-methods";

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
    console.log("check =", dashboardCount)
    return (
        <DashboardScreen 
            dashboardCount={dashboardCount}
        />
    );
}


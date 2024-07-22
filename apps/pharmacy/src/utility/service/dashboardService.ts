import { APIConstant, BaseService, IResponse } from "@repo/common/common-library"
import { IDashboardCount } from "../../pages/dashboard/presentation/types"

export class DashboardService {
	static getDashboardCount = async (user_id: number): Promise<IDashboardCount> => {
		const response = await BaseService.get<IResponse<IDashboardCount>>(
			APIConstant.pharmacy_dashboard_get_count.replace('<str:chat_profile_id>', user_id+''),
			true
		)
		return response.results
	}
}

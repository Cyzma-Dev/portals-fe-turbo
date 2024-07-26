import { APIConstant, BaseService, IResponse } from '@repo/common/common-library';
export class TocTemplateService {
	static get = async () => {
		const response = await BaseService.get<IResponse>(
			APIConstant.tosConfig,
			true
		)
		return response
	}
}

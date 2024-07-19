import { IOptions } from '@repo/common/common-library';
import { useState } from 'react';
import { CommonService } from '../../../../packages/common/src/utility/service/commonService';

export const DocumentTypeOptionsHook = () => {
	const [loading, setLoading] = useState(true);
	const [documentOptionsData, setDocumentOptionsData] = useState<IOptions[]>([]);

	const fetchData = async () => {
		try {
			setLoading(true);
			const result = await CommonService.getDocumentTypeOptions();
			setDocumentOptionsData(result.results);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return { documentOptionsData, fetchData, loading };
};


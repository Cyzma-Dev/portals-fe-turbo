import { apiCallTime, IQueryString, MessageConstant } from '@repo/common/common-library';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PatientListingService } from '../utility/service/patientListingService';

export const PatientListingHook = () => {

	const [isLoading, setIsLoading] = useState(false);
	const [patientListingData, setPatientListingData] = useState([]);
	const [error, setError] = useState('');
	const [gridCount, setGridCount] = useState(0);
	const [queryString, setQueryString] = useState<IQueryString>({
		filter: {
			filters: [],
			logic: 'and',
		},
		skip: 0,
		take: 10,
	});

	const fetchPatientListingData = async (search?: IQueryString) => {
		try {
			setError('');
			setIsLoading(true);
			const result: any = await PatientListingService.getAllPatientData(
				JSON.stringify(search)
			);
			if (result) {
				setPatientListingData(result.results);
				setGridCount(result?.count);
			}
		} catch (error: any) {
			error?.data?.error && toast.error(error?.data?.error);
			error?.data?.message && toast.error(error?.data?.message);
			setError(error?.data?.message || MessageConstant.commonFailureMessage);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPatientListingData(queryString);
		const intervalCall = setInterval(() => {
			fetchPatientListingData(queryString);
		}, apiCallTime);
		return () => clearInterval(intervalCall);
	}, [queryString.skip, queryString.filter.filters, queryString.take]);

	return {
		isLoading,
		patientListingData,
		error,
		fetchPatientListingData,
		setIsLoading,
		setQueryString,
		queryString,
		gridCount
	};
};

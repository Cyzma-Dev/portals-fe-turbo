import { toast } from "sonner";
import { IQueryString, MessageConstant, PatientDocumentsService } from "../utility";
import { useEffect, useState } from "react";
import { apiCallTime } from "../helper-methods";

export const PatientDocumentsHook = (patientId: number) => {

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [patientDocumentsData, setPatientDocumentsData] = useState(null);
	const [gridCount, setGridCount] = useState(0);
	const [queryString, setQueryString] = useState<IQueryString>({
		filter: {
			filters: [],
			logic: 'and',
		},
		skip: 0,
		take: 10,
	});
	const fetchPatientDocuments = async (patientId: number, search: IQueryString) => {
		try {
			setError('');
			setIsLoading(true);
			const result = await PatientDocumentsService.getPatientDocuments(
				patientId,
				JSON.stringify(search)
			);
			setPatientDocumentsData(result.results);
			setGridCount(result?.count);
		} catch (error: any) {
			error?.data?.error && toast.error(error?.data?.error);
			error?.data?.message && toast.error(error?.data?.message);
			setError(error?.data?.message || MessageConstant.commonFailureMessage);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPatientDocuments(patientId, queryString);
		const intervalCall = setInterval(() => {
			fetchPatientDocuments(patientId, queryString);
		}, apiCallTime);
		return () => clearInterval(intervalCall);
	}, [patientId, queryString.skip, queryString.filter.filters, queryString.take]);

	return {
		isLoading,
		patientDocumentsData,
		fetchPatientDocuments,
		error,
		setIsLoading,
		queryString,
		setQueryString,
		gridCount,
	};
};

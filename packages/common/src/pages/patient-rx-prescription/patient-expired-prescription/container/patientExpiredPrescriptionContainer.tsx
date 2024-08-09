import { ExpiredPrescriptionListHook } from "../../../../common-hooks";
import { GetPatientId } from "../../../../helper-methods";
import { IQueryString } from "../../../../utility";
import { useCallback, useState } from "react";
import CustomFilterStateManage from "../../../../helper-methods/custom-filter";
import ExpiredPrescriptionScreen from "../presentation/expiredPrescription";


export const PatientExpiredPrescriptionContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		isLoading: isGridDataLoading,
		expiredPrescriptionData,
		queryString,
		setQueryString,
		gridCount,
	} = ExpiredPrescriptionListHook(patient_id)

	const [filterOpen, setFilterOpen] = useState<boolean>(false);


	const handleFilterChange = (field: string, operator: string, event: any) => {
		const filteredData = CustomFilterStateManage(
			queryString,
			field,
			operator,
			event
		)
		setQueryString((prevState: IQueryString) => ({
			...prevState,
			filter: {
				...prevState.filter,
				filters: filteredData,
			},
		}))
	}

	const handleGridChange = useCallback(
		(event: any) => {
			setQueryString((prevState: IQueryString) => {
				if (
					prevState.skip ===
					event.pageIndex *
					event.pageSize &&
					prevState.take === event.pageSize
				) {
					return prevState
				}

				return {
					...prevState,
					skip:
						event.pageIndex *
						event.pageSize,
					take: event.pageSize,
				}
			})
		},
		[setQueryString]
	)

	return (
		<ExpiredPrescriptionScreen
			expiredPrescriptionData={expiredPrescriptionData ? expiredPrescriptionData : []}
			handleGridChange={handleGridChange}
			handleFilterChange={handleFilterChange}
			filterOpen={filterOpen}
			setFilterOpen={setFilterOpen}
			isGridDataLoading={isGridDataLoading}
			gridCount={gridCount}
		/>
	);
};

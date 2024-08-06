import { IQueryString } from '@repo/common/common-library';
import { GetPatientId } from '../../../../../../packages/common/src/helper-methods';
import { useCallback, useState } from 'react';
import { PatientRxArchiveHook } from '../../../hooks';
import CustomFilterStateManage from '../../../../../../packages/common/src/helper-methods/custom-filter';
import PatientRxArchiveScreen from '../presentation/patientRxArchive';

export const PatientRxArchiveContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		loading: isGridDataLoading,
		RxArchiveListData,
		queryString,
		setQueryString,
		gridCount,
	} = PatientRxArchiveHook(patient_id)

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
		<PatientRxArchiveScreen
			RxArchiveListData={RxArchiveListData ? RxArchiveListData : []}
			handleGridChange={handleGridChange}
			handleFilterChange={handleFilterChange}
			filterOpen={filterOpen}
			setFilterOpen={setFilterOpen}
			isGridDataLoading={isGridDataLoading}
			gridCount={gridCount}
		/>
	);
};

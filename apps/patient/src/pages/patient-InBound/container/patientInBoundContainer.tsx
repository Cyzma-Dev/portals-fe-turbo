import { IQueryString } from '@repo/common/common-library';
import { GetPatientId } from '../../../../../../packages/common/src/helper-methods';
import { useCallback, useState } from 'react';
import { PatientInBoundHook } from '../../../hooks';
import CustomFilterStateManage from '../../../../../../packages/common/src/helper-methods/custom-filter';
import PatientInBoundScreen from '../presentation/patientInBound';
import { DocumentSkeleton } from '@repo/ui/shadcn';

export const PatientInBoundContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		inBoundListData,
		setQueryString,
		queryString,
		loading
	} = PatientInBoundHook(patient_id)

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
		!filterOpen && loading
			?
			<DocumentSkeleton
				title='In Bound'
			/>
			:
			<PatientInBoundScreen
				inBoundListData={inBoundListData ? inBoundListData : []}
				handleGridChange={handleGridChange}
				handleFilterChange={handleFilterChange}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
			/>
	);
};

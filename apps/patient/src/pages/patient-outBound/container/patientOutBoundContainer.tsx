import { IQueryString } from '@repo/common/common-library';
import { GetPatientId } from '../../../../../../packages/common/src/helper-methods';
import { useCallback } from 'react';
import CustomFilterStateManage from '../../../../../../packages/common/src/helper-methods/custom-filter';
import PatientOutBoundScreen from '../presentation/patientOutBound';
import { PatientOutboundHook } from '../../../hooks';

export const PatientOutBoundContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		outBoundListData,
		setQueryString,
		queryString,
		loading: isGridDataLoading,
		gridCount,
	} = PatientOutboundHook(patient_id)

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
		<PatientOutBoundScreen
			outBoundListData={outBoundListData ? outBoundListData : []}
			handleGridChange={handleGridChange}
			handleFilterChange={handleFilterChange}
			isGridDataLoading={isGridDataLoading}
			gridCount={gridCount}
		/>
	);
};

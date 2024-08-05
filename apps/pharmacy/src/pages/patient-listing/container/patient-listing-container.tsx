import React, { useCallback, useState } from 'react';
import { PatientListingHook } from '../../../hooks';
import { IQueryString } from '@repo/common/common-library';
import CustomFilterStateManage from '../../../../../../packages/common/src/helper-methods/custom-filter';
import PatientListing from '../presentation/patient-listing';

export const PatientListingContainer = () => {
    const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const {
		patientListingData,
		queryString,
		setQueryString,
		isLoading: isGridDataLoading,
		gridCount,
	} = PatientListingHook();

	const handleFilterChange = (field: string, operator: string, event: any) => {
		const filteredData = CustomFilterStateManage(
			queryString,
			field,
			operator,
			event
		);
		setQueryString((prevState: IQueryString) => ({
			...prevState,
			filter: {
				...prevState.filter,
				filters: filteredData,
			},
		}));
	};

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
		<PatientListing
			patientListingData={patientListingData ? patientListingData : []}
			isGridDataLoading={isGridDataLoading}
			gridCount={gridCount}			
			handleFilterChange={handleFilterChange}
			handleGridChange={handleGridChange}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
		/>
	);
};

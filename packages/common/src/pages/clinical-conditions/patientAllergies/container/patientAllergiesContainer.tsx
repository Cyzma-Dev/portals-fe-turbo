import { useCallback, useState } from 'react';
import { ICreatePatientAllergies, IPatientAllergies } from '../presentation/types';
import { toast } from 'sonner';
import { DocumentSkeleton } from '@repo/ui/shadcn';
import CustomFilterStateManage from '../../../../helper-methods/custom-filter';
import { GetPatientId } from '../../../../helper-methods';
import { PatientAllergiesHook } from '../../../../common-hooks';
import { IQueryString, MessageConstant, PatientAllergiesService } from '../../../../utility';
import PatientAllergiesScreen from '../presentation/patientAllergies';

export const PatientAllergiesContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		patientAllergiesData,
		fetchPatientAllergies,
		setQueryString,
		queryString,
		isLoading: isLoadingAllergies,
	} = PatientAllergiesHook(patient_id);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
	const [sheetOpen, setSheetOpen] = useState<boolean>(false);
	const [currentAllergies, setCurrentAllergies] = useState<IPatientAllergies>();
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const closeSheet = () => {
		setSheetOpen(false);
		setCurrentAllergies(undefined);
	};

	const openSheet = () => {
		setSheetOpen(true);
	};

	const handleEdit = (row: IPatientAllergies) => {
		setCurrentAllergies(row);
		setIsEdit(true);
		openSheet();
	};

	const handleSubmit = async (formData: ICreatePatientAllergies) => {
		setIsBtnDisable(true);
		try {
			setIsLoading(true);
			if (isEdit) {
				const response = await PatientAllergiesService.updatePatientAllergies(
					currentAllergies!.id,
					{
						...formData,
						id: currentAllergies!.id,
					}
				);
				response?.message && toast.success(response?.message);
				fetchPatientAllergies(patient_id, queryString);
				closeSheet();
			} else {
				const response = await PatientAllergiesService.createPatientAllergies({
					...formData,
					patient_id: patient_id,
				});
				toast.success(response?.message);
				fetchPatientAllergies(patient_id, queryString);
				closeSheet();
			}
		} catch (error: any) {
			if (error?.data?.state === 'error' || error?.data?.state == 'exception') {
				if (typeof error?.data?.error === 'object') {
					Object.keys(error?.data?.error).forEach((key) => {
						toast.error(error?.data?.error[key]);
					});
				} else {
					error?.data?.error && toast.error(error?.data?.error);
					error?.data?.message && toast.error(error?.data?.message);
				}
			} else {
				error?.data?.error && toast.error(error?.data?.error);
				error?.data?.message && toast.error(error?.data?.message);
			}
		} finally {
			setIsLoading(false);
			setIsBtnDisable(false);
		}
	};

	const handlePatientNoteDelete = async (rec_id: number) => {
		try {
			setIsLoading(true);
			const response = await PatientAllergiesService.deletePatientAllergies(rec_id);
			response?.message && toast.success(response?.message);
			fetchPatientAllergies(patient_id, queryString);
		} catch (error: any) {
			if (error?.status === 404) {
				toast.error(MessageConstant.commonFailureMessage);
			} else {
				error?.data?.error && toast.error(error?.data?.error);
				error?.data?.message && toast.error(error?.data?.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

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
					return prevState;
				}

				return {
					...prevState,
					skip:
						event.pageIndex *
						event.pageSize,
					take: event.pageSize,
				};
			});
		},
		[setQueryString]
	);

	return (
		!filterOpen && isLoadingAllergies
			?
			<DocumentSkeleton title='Allergies' />
			:
			<PatientAllergiesScreen
				patientAllergiesData={patientAllergiesData ? patientAllergiesData : []}
				handleGridChange={handleGridChange}
				handleFilterChange={handleFilterChange}
				handlePatientNoteDelete={handlePatientNoteDelete}
				isEdit={isEdit}
				setIsEdit={setIsEdit}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				isBtnDisable={isBtnDisable}
				setIsBtnDisable={setIsBtnDisable}
				sheetOpen={sheetOpen}
				setSheetOpen={setSheetOpen}
				openSheet={openSheet}
				handleSubmit={handleSubmit}
				handleEdit={handleEdit}
				currentAllergies={currentAllergies}
				setCurrentAllergies={setCurrentAllergies}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
			/>
	);
};

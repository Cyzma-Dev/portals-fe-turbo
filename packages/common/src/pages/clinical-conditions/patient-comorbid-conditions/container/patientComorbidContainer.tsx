import { useCallback, useState } from 'react';
import { IPatientComorbid } from '../presentation/types';
import { toast } from 'sonner';
import { DocumentSkeleton } from '@repo/ui/shadcn';
import CustomFilterStateManage from '../../../../helper-methods/custom-filter';
import { GetPatientId } from '../../../../helper-methods';
import { PatientComorbidConditionsHook } from '../../../../common-hooks';
import { IQueryString, MessageConstant, PatientComorbidConditionsService } from '../../../../utility';
import PatientComorbidConditionsScreen from '../presentation/patientComorbidConditions';

export const PatientComorbidContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		patientComorbidConditionsData,
		fetchPatientComorbidConditions,
		setQueryString,
		queryString,
		isLoading: isLoadingComorbidConditionsData,
	} = PatientComorbidConditionsHook(patient_id)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false)
	const [sheetOpen, setSheetOpen] = useState<boolean>(false);
	const [currentComorbidConditions, setCurrentComorbidConditions] = useState<IPatientComorbid>()
	const [filterOpen, setFilterOpen] = useState<boolean>(false);


	const closeSheet = () => {
		setSheetOpen(false)
		setCurrentComorbidConditions(undefined)
	}

	const openSheet = () => {
		setSheetOpen(true)
	}

	const handleEdit = (row: IPatientComorbid) => {
		setCurrentComorbidConditions(row)
		setIsEdit(true)
		openSheet()
	}

	const handleSubmit = async (formData: IPatientComorbid) => {
		setIsBtnDisable(true)
		try {
			setIsLoading(true)
			if (isEdit) {
				const response = await PatientComorbidConditionsService.updatePatientComorbidConditions(
					currentComorbidConditions!.id,
					{
						...formData,
						id: currentComorbidConditions!.id,
					}
				)
				response?.message && toast.success(response?.message)
				fetchPatientComorbidConditions(patient_id, queryString)
				closeSheet()
			} else {
				const response = await PatientComorbidConditionsService.createPatientComorbidConditions({
					...formData,
					patient_id: patient_id,
				})
				toast.success(response?.message)
				fetchPatientComorbidConditions(patient_id, queryString)
				closeSheet()
			}
		} catch (error: any) {
			if (error?.data?.state === 'error' || error?.data?.state == 'exception') {
				if (typeof error?.data?.error === 'object') {
					Object.keys(error?.data?.error).forEach((key) => {
						toast.error(error?.data?.error[key])
					})
				} else {
					error?.data?.error && toast.error(error?.data?.error)
					error?.data?.message && toast.error(error?.data?.message)
				}
			} else {
				error?.data?.error && toast.error(error?.data?.error)
				error?.data?.message && toast.error(error?.data?.message)
			}
		} finally {
			setIsLoading(false)
			setIsBtnDisable(false)
		}
	}

	const handlePatientComorbidDelete = async (rec_id: number) => {
		try {
			setIsLoading(true)
			const response = await PatientComorbidConditionsService.deletePatientComorbidConditions(rec_id)
			response?.message && toast.success(response?.message)
			fetchPatientComorbidConditions(patient_id, queryString)
		} catch (error: any) {
			if (error?.status === 404) {
				toast.error(MessageConstant.commonFailureMessage)
			} else {
				error?.data?.error && toast.error(error?.data?.error)
				error?.data?.message && toast.error(error?.data?.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

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
		!filterOpen && isLoadingComorbidConditionsData
			?
			<DocumentSkeleton title='Comorbid Conditions' />
			:
			<PatientComorbidConditionsScreen
				patientComorbidConditionsData={patientComorbidConditionsData ? patientComorbidConditionsData : []}
				handleGridChange={handleGridChange}
				handleFilterChange={handleFilterChange}
				handlePatientComorbidDelete={handlePatientComorbidDelete}
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
				currentComorbidConditions={currentComorbidConditions}
				setCurrentComorbidConditions={setCurrentComorbidConditions}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
			/>
	);
};

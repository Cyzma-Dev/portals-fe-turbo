import { useCallback, useState } from 'react';
import { ICreatePatientHighRisk, IPatientHighRisk } from '../presentation/types';
import { toast } from 'sonner';
import { DocumentSkeleton } from '@repo/ui/shadcn';
import CustomFilterStateManage from '../../../../helper-methods/custom-filter';
import { GetPatientId } from '../../../../helper-methods';
import { PatientHighRiskConditionsHook } from '../../../../common-hooks';
import { IQueryString, MessageConstant, PatientHighRiskConditionsService } from '../../../../utility';
import PatientHighRiskConditionScreen from '../presentation/patientHighRiskCondition';

export const PatientHighRiskContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		patientHighRiskData,
		fetchPatientHighRiskData,
		setQueryString,
		queryString,
		isLoading: highRiskConditionData,
	} = PatientHighRiskConditionsHook(patient_id)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false)
	const [sheetOpen, setSheetOpen] = useState<boolean>(false);
	const [currentHighRiskCondition, setCurrentHighRiskCondition] = useState<IPatientHighRisk>()
	const [filterOpen, setFilterOpen] = useState<boolean>(false);


	const closeSheet = () => {
		setSheetOpen(false)
		setCurrentHighRiskCondition(undefined)
	}

	const openSheet = () => {
		setSheetOpen(true)
	}

	const handleEdit = (row: IPatientHighRisk) => {
		setCurrentHighRiskCondition(row)
		setIsEdit(true)
		openSheet()
	}

	const handleSubmit = async (formData: ICreatePatientHighRisk) => {
		setIsBtnDisable(true)
		try {
			setIsLoading(true)
			if (isEdit) {
				const response = await PatientHighRiskConditionsService.updatePatientHighRiskConditions(
					currentHighRiskCondition!.id,
					{
						...formData,
						id: currentHighRiskCondition!.id,
					}
				)
				response?.message && toast.success(response?.message)
				fetchPatientHighRiskData(patient_id, queryString)
				closeSheet()
			} else {
				const response = await PatientHighRiskConditionsService.createPatientHighRiskConditions({
					...formData,
					patient_id: patient_id,
				})
				toast.success(response?.message)
				fetchPatientHighRiskData(patient_id, queryString)
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

	const handlePatientNoteDelete = async (rec_id: number) => {
		try {
			setIsLoading(true)
			const response = await PatientHighRiskConditionsService.deletePatientHighRiskConditions(rec_id)
			response?.message && toast.success(response?.message)
			fetchPatientHighRiskData(patient_id, queryString)
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
		!filterOpen && highRiskConditionData
			?
			<DocumentSkeleton title='High Risk Conditions' />
			:
			<PatientHighRiskConditionScreen
				patientHighRiskData={patientHighRiskData ? patientHighRiskData : []}
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
				currentHighRiskCondition={currentHighRiskCondition}
				setCurrentHighRiskCondition={setCurrentHighRiskCondition}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
			/>
	);
};

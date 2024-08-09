import { useCallback, useState } from "react";
import { GetPatientId } from "../../../../../../packages/common/src/helper-methods";
import { ICreateDocuments, IPatientDocument, IPreviewDocuments, IUploadDocument } from "../presentation";
import { toast } from "sonner";
import { IQueryString, MessageConstant, PatientDocumentsHook, PatientDocumentsService } from "@repo/common/common-library";
import CustomFilterStateManage from "../../../../../../packages/common/src/helper-methods/custom-filter";
import PatientDocumentScreen from "../presentation/patientDocuments";

export const PatientDocumentsContainer = () => {

	const patient_id: number = GetPatientId();
	const {
		patientDocumentsData,
		fetchPatientDocuments,
		setQueryString,
		queryString,
		isLoading: isGridDataLoading,
		gridCount
	} = PatientDocumentsHook(patient_id)

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false)
	const [sheetOpen, setSheetOpen] = useState<boolean>(false);
	const [currentDocument, setCurrentDocument] = useState<IPatientDocument>()
	const [viewerFile, setViewerFile] = useState<IUploadDocument | null>(null);
	const [previewSheetOpen, setPreviewSheetOpen] = useState<boolean>(false);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const closeSheet = () => {
		setSheetOpen(false)
		setCurrentDocument(undefined)
	}

	const openSheet = () => {
		setSheetOpen(true)
	}

	const handleEdit = (row: IPatientDocument) => {
		setCurrentDocument(row)
		setIsEdit(true)
		openSheet()
	}

	const handleSubmit = async (formData: ICreateDocuments) => {
		setIsBtnDisable(true)
		try {
			setIsLoading(true)
			if (isEdit) {
				const response = await PatientDocumentsService.updatePatientDocument(
					currentDocument!.id,
					{
						...formData,
						id: currentDocument!.id,
					}
				)
				response?.message && toast.success(response?.message)
				fetchPatientDocuments(patient_id, queryString)
				closeSheet()
			} else {
				const fileData = new FormData();
				const contentType = 'multipart/form-data';
				for (const key in formData) {
					fileData.append(key, formData[key as keyof ICreateDocuments] as string | Blob);
				}
				const response = await PatientDocumentsService.uploadPatientDocument(
					fileData,
					patient_id,
					contentType
				)
				toast.success(response?.message)
				fetchPatientDocuments(patient_id, queryString)
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

	const handleDocumentDelete = async (rec_id: number) => {
		try {
			setIsLoading(true)
			const response = await PatientDocumentsService.deletePatientDocument(rec_id)
			response?.message && toast.success(response?.message)
			fetchPatientDocuments(patient_id, queryString)
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
	const handlePreviewDocuments = async (item: IPreviewDocuments) => {
		setIsLoading(true)
		try {
			const result = await PatientDocumentsService.getPatientDocument(item.id);
			setPreviewSheetOpen(true)
			setViewerFile(result.results);
		} catch (error: any) {
			if (error?.status) {
				error?.data?.error && toast.error(error?.data?.error);
				error?.data?.message && toast.error(error?.data?.message);
			}
		} finally {
			setIsLoading(false)
		}
	};


	return (
		<PatientDocumentScreen
			patientDocumentsData={patientDocumentsData ? patientDocumentsData : []}
			handleGridChange={handleGridChange}
			handleFilterChange={handleFilterChange}
			handleDocumentDelete={handleDocumentDelete}
			isEdit={isEdit}
			setIsEdit={setIsEdit}
			isLoading={isLoading}
			isBtnDisable={isBtnDisable}
			sheetOpen={sheetOpen}
			setSheetOpen={setSheetOpen}
			openSheet={openSheet}
			handleSubmit={handleSubmit}
			handleEdit={handleEdit}
			currentDocument={currentDocument}
			setCurrentDocument={setCurrentDocument}
			filterOpen={filterOpen}
			setFilterOpen={setFilterOpen}
			handlePreviewDocuments={handlePreviewDocuments}
			viewerFile={viewerFile}
			previewSheetOpen={previewSheetOpen}
			setPreviewSheetOpen={setPreviewSheetOpen}
			isGridDataLoading={isGridDataLoading}
			gridCount={gridCount}
		/>
	);
};

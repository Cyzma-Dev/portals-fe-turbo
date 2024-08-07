import { DocumentSkeleton } from "@repo/ui/shadcn";
import { ActiveAddressOptionsHook, PrescriptionListHook } from "../../../../common-hooks";
import { GetPatientId } from "../../../../helper-methods";
import { IQueryString, MessageConstant, PatientRefillRequestService } from "../../../../utility";
import { useCallback, useState } from "react";
import CustomFilterStateManage from "../../../../helper-methods/custom-filter";
import PrescriptionScreen from "../presentation/Prescription";
import { toast } from "sonner";
import { IRequestRefill } from "../presentation";


export const PrescriptionContainer = () => {
	const patient_id: number = GetPatientId();
	const {
		isLoading: PrescriptionDataLoading,
		prescriptionData,
		queryString,
		PrescriptionList,
		setQueryString,
		gridCount,
	} = PrescriptionListHook(patient_id)
	const { activeAddressOptions, fetchAddressList } = ActiveAddressOptionsHook(patient_id);


	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [sheetOpen, setSheetOpen] = useState<boolean>(false);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false)
	const [currentPrescription, setCurrentPrescription] = useState<any[]>([])
	const [newAddressSheetOpen, setNewAddressSheetOpen] = useState<boolean>(false)
	const [newAddressBtnDisable, setNewAddressBtnDisable] = useState<boolean>(false)
	const [newAddressLoading, setNewAddressLoading] = useState<boolean>(false)
	// const [currentAddress, setCurrentAddress] = useState<IPatientAddress | null>();

	const closeSheet = () => {
		setSheetOpen(false)
		setCurrentPrescription([])
		// setCurrentAddress([])
	}

	const openSheet = () => {
		fetchAddressList(patient_id)
		setSheetOpen(true)
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

	const handlePrescriptionRequestSubmit = async (
		refillRequest: IRequestRefill
	) => {
		setIsBtnDisable(true);
		setIsLoading(true);
		try {
			// const fillDate = new Date(refillRequest?.needed_date);
			// const needed_date = DateUtility.getDateString(fillDate);
			const reqData = {
				...refillRequest,
				// needed_date,
			}
			const response = await PatientRefillRequestService.createRefiilRequest(
				reqData,
				patient_id
			);
			if (response.state === 'success') {
				toast.success(response.message);
			}
			PrescriptionList(patient_id, queryString);
			closeSheet();
			setIsBtnDisable(false);
			setIsLoading(false);
		} catch (error: any) {

			setIsBtnDisable(false);
			setIsLoading(false)

			if (error.data?.state == 'error' || error?.data?.state === 'exception') {
				error?.data?.error && toast.error(error?.data?.error);
				error?.data?.message && toast.error(error?.data?.message);
			} else {
				toast.error(MessageConstant.commonFailureMessage);
			}
		}
	};
	return (
		!filterOpen && PrescriptionDataLoading
			?
			<DocumentSkeleton
				title='Prescriptions'
			/>
			:
			<>
				<PrescriptionScreen
					prescriptionData={prescriptionData ? prescriptionData : []}
					handleGridChange={handleGridChange}
					handleFilterChange={handleFilterChange}
					filterOpen={filterOpen}
					setFilterOpen={setFilterOpen}
					sheetOpen={sheetOpen}
					currentPrescription={currentPrescription}
					setCurrentPrescription={setCurrentPrescription}
					openSheet={openSheet}
					setSheetOpen={setSheetOpen}
					isLoading={isLoading}
					isBtnDisable={isBtnDisable}
					activeAddressOptions={activeAddressOptions}
					gridCount={gridCount}
					handlePrescriptionRequestSubmit={handlePrescriptionRequestSubmit}
					// addNewAddress props
					addNewAddressSheetOpen={newAddressSheetOpen}
					setNewAddressSheetOpen={setNewAddressSheetOpen}
					newAddressBtnDisable={newAddressBtnDisable}
					newAddressLoading={newAddressLoading}
				/>
				<button onClick={() => setNewAddressSheetOpen(true)}>Add new Address</button>
			</>
	);
};

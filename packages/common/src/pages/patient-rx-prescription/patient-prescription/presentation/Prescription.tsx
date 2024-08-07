import React, { useEffect, useState } from "react";
import { CustomColumnDef } from "../../../../utility";
import { Button, Checkbox, DataTable, DataTableColumnHeader, Icons, IOptions, NotesTooltipViewer } from "@repo/ui/shadcn";
import IconWrapper from "../../../../../../ui/src/components/Icon-wrapper";
import FilterFields from "../../../../../../ui/src/components/filter-fields";
import { IAddNewAddressProps, IPatientPrescription, IRequestRefillCommonProps } from "./types";
import PrescriptionRxFullHistory from "./prescriptionRxFullHistory";
import { prescriptionColumns } from "./prescriptionColumns";
import { PrescriptionRequestRefill } from "./prescriptionRequestRefill";
import PatientAddNewAddress from "./patientAddNewAddress";

interface IPatientRxPrescriptionProps extends IRequestRefillCommonProps, IAddNewAddressProps {
	prescriptionData: IPatientPrescription[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	filterOpen: boolean;
	setFilterOpen: (data: boolean) => void;
	activeAddressOptions: IOptions[];
	gridCount: number

}

const PrescriptionScreen = (props: IPatientRxPrescriptionProps) => {
	const [refillHeaderDetails, setRefillHeaderDetails] = useState<any>(null);
	const [fillData, setFillData] = useState<IPatientPrescription[]>([]);
	const [fullScreenDialog, setFullScreenDialog] = useState<boolean>(false);
	const [selectedRowData, setSelectedRowData] = useState<IPatientPrescription[]>([]);
	const [refillRequestBtnDisable, setRefillRequestBtnDisable] = useState<boolean>(true);

	const handleAdditionalDetail = (row: any) => {
		setFullScreenDialog(true);
		setRefillHeaderDetails({
			rx_number: row?.rx_number,
			drug_name: row?.drug_name,
		});
		const rxFillRows = row?.rx_fills?.map((fill: any) => {
			return { ...fill, ...fill.shipping_[0] };
		});
		row?.rx_fills && setFillData(rxFillRows);
	};



	const isRowSelectDisabled = (params: any) => {
		const currentDate = new Date();
		const sevenDaysAgo = new Date(currentDate);
		sevenDaysAgo.setDate(currentDate.getDate() + 7);
		const nextFillDate = new Date(params.next_fill_date);
		const expirationDate = new Date(params.expiration_date);

		return !(nextFillDate <= sevenDaysAgo && nextFillDate >= currentDate
			&& params.refill_request_status !== "Approved"
			&& params.refill_request_status !== "Requested"
			&& expirationDate >= currentDate);

	};


	const handleCheckboxChange = (row: IPatientPrescription, isChecked: boolean) => {
		setSelectedRowData((prev) => {
			if (isChecked) {
				// Add to selected rows
				return [...prev, row];
			} else {
				// Remove from selected rows
				return prev.filter((r) => r.id !== row.id);
			}
		});
	};

	useEffect(() => {
		props.setCurrentPrescription(selectedRowData)
		setRefillRequestBtnDisable(selectedRowData.length === 0 ? true : false);
	}, [selectedRowData])

	const extendColumns: CustomColumnDef<any>[] = [
		{
			accessorKey: "select",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="" />
			),
			cell: ({ row }) => (

				<Checkbox
					checked={selectedRowData.some((r) => r.id === row.original.id)}
					onCheckedChange={(checked) => handleCheckboxChange(row.original, Boolean(checked))}
					aria-label="Select row"
					disabled={isRowSelectDisabled(row.original)}
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: "actions",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="" />
			),
			cell: ({ row }) => (
				<IconWrapper
					className="cursor-pointer hover:text-blue hover:fill-blueBackground hover:bg-blueBackground"
					onClick={() => handleAdditionalDetail(row.original)}
				>
					<Icons.add className="h-4 w-4" />
				</IconWrapper>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "refill_request_status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => (
				<>
					{row.getValue("refill_request_status") && (
						<NotesTooltipViewer
							header={`Reason for ${row.getValue("refill_request_status")}`}
							Content={row.original.note}
							statusValue={row.getValue("refill_request_status")}
						/>
					)}
				</>
			),
			enableSorting: true,
			enableHiding: false,
		},
		...prescriptionColumns,
	];

	return (
		<div className="flex flex-col gap-4 w-full h-full">
			<div className="flex gap-4 justify-content items-center text-xl font-bold">
				Prescription
				<div className="flex gap-1">
					<Button variant="secondary" size="sm" className="flex gap-1" onClick={props.openSheet} disabled={refillRequestBtnDisable}>
						Request Refill
					</Button>
					<Button variant="ghost" size="sm" className="flex gap-1" onClick={() => props.setFilterOpen(!props.filterOpen)}>
						<Icons.listFilter className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{props.filterOpen && (
				<FilterFields
					filterOpen={props.filterOpen}
					handleFilterChange={props.handleFilterChange}
					listColumns={extendColumns}
					options={[]}
				/>
			)}
			<DataTable
				data={props.prescriptionData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
				gridCount={props.gridCount}
			/>
			<PrescriptionRxFullHistory
				fullScreenDialog={fullScreenDialog}
				setFullScreenDialog={setFullScreenDialog}
				refillHeaderDetails={refillHeaderDetails}
				fillData={fillData}
			/>
			<PrescriptionRequestRefill
				sheetOpen={props.sheetOpen}
				currentPrescription={props.currentPrescription}
				setCurrentPrescription={props.setCurrentPrescription}
				openSheet={props.openSheet}
				setSheetOpen={props.setSheetOpen}
				isLoading={props.isLoading}
				isBtnDisable={props.isBtnDisable}
				activeAddressOptions={props.activeAddressOptions}
				handlePrescriptionRequestSubmit={props.handlePrescriptionRequestSubmit}

			/>
			<PatientAddNewAddress
				addNewAddressSheetOpen={props.addNewAddressSheetOpen}
				setNewAddressSheetOpen={props.setNewAddressSheetOpen}
				newAddressBtnDisable={props.newAddressBtnDisable}
				newAddressLoading={props.newAddressLoading}
			/>
		</div>
	);
};

export default PrescriptionScreen;

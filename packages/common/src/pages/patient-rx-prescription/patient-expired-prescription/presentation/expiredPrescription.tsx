import React, { useState } from "react";
import { CustomColumnDef } from "../../../../utility";
import { Button, DataTable, DataTableColumnHeader, Icons, NotesTooltipViewer } from "@repo/ui/shadcn";
import IconWrapper from "../../../../../../ui/src/components/Icon-wrapper";
import FilterFields from "../../../../../../ui/src/components/filter-fields";
import { IPatientExpiredPrescription } from "./types";
import ExpiredRxFullHistory from "./expiredRxFullHistory";
import { expiredPrescriptionColumns } from "./expiredPrescriptionColumns";



interface IPatientRxExpiredPrescriptionProps {
	expiredPrescriptionData: IPatientExpiredPrescription[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	filterOpen: boolean
	setFilterOpen: (data: boolean) => void
}

const ExpiredPrescriptionScreen = (props: IPatientRxExpiredPrescriptionProps) => {
	const [refillHeaderDetails, setRefillHeaderDetails] = useState<any>(null);
	const [fillData, setFillData] = useState<IPatientRxExpiredPrescriptionProps[]>([]);
	const [fullScreenDialog, setFullScreenDialog] = useState<boolean>(false);

	const handleAdditionalDetail = (row: any) => {
		setFullScreenDialog(true)
		setRefillHeaderDetails({
			"rx_number": row?.rx_number,
			"drug_name": row?.drug_name
		});
		const rxFillRows = row?.rx_fills?.map((row: any) => {
			const flattenedRow = { ...row, ...row.shipping_[0] };
			return flattenedRow;
		});
		row?.rx_fills && setFillData(rxFillRows);
	};

	const extendColumns: CustomColumnDef<any>[] = [
		{
			id: "actions",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="" />
			),
			cell: ({ row }) =>
				<IconWrapper
					className="cursor-pointer hover:text-blue hover:fill-blueBackground hover:bg-blueBackground"
					onClick={() => {
						handleAdditionalDetail(row.original)
					}}
				>
					<Icons.add className="h-4 w-4" />
				</IconWrapper>,

			enableSorting: true,
			enableHiding: false,
		},
		{
			accessorKey: "rx_request_status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) =>
				<NotesTooltipViewer
					header={`Reason for ${row.getValue("rx_request_status")}`}
					Content={row.original.note}
					statusValue={row.getValue("rx_request_status")}
				/>,
			enableSorting: true,
			enableHiding: false,
		},

		...expiredPrescriptionColumns,

	]

	return (
		<div
			className='flex flex-col gap-4 w-full h-full'
		>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Expired Prescription

				<div className='flex gap-1'>

					<Button variant="ghost" size="sm" className="flex gap-1" onClick={() => props.setFilterOpen(!props.filterOpen)}>
						<Icons.listFilter className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{props.filterOpen
				&&
				<FilterFields
					filterOpen={props.filterOpen}
					handleFilterChange={props.handleFilterChange}
					listColumns={extendColumns}
					options={[]}
				/>
			}
			<DataTable
				data={props.expiredPrescriptionData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
			<ExpiredRxFullHistory
				fullScreenDialog={fullScreenDialog}
				setFullScreenDialog={setFullScreenDialog}
				refillHeaderDetails={refillHeaderDetails}
				fillData={fillData}
			/>
		</div>
	);
};

export default ExpiredPrescriptionScreen
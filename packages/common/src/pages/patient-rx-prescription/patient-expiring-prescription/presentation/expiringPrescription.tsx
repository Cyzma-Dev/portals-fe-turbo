import React, { useState } from "react";
import { CustomColumnDef } from "../../../../utility";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import IconWrapper from "../../../../../../ui/src/components/Icon-wrapper";
import FilterFields from "../../../../../../ui/src/components/filter-fields";
import { IPatientExpiringPrescription } from "./types";
import ExpiringRxFullHistory from "./expiringRxFullHistory";
import { expiringPrescriptionColumns } from "./expiringPrescriptionColumns";



interface IPatientRxExpiringPrescriptionProps {
	expiringPrescriptionData: IPatientExpiringPrescription[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	filterOpen: boolean
	setFilterOpen: (data: boolean) => void
}

const ExpiringPrescriptionScreen = (props: IPatientRxExpiringPrescriptionProps) => {
	const [refillHeaderDetails, setRefillHeaderDetails] = useState<any>(null);
	const [fillData, setFillData] = useState<IPatientRxExpiringPrescriptionProps[]>([]);
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
		...expiringPrescriptionColumns,

	]

	return (
		<div
			className='flex flex-col gap-4 w-full h-full'
		>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Expiring Prescription

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
				data={props.expiringPrescriptionData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
			<ExpiringRxFullHistory
				fullScreenDialog={fullScreenDialog}
				setFullScreenDialog={setFullScreenDialog}
				refillHeaderDetails={refillHeaderDetails}
				fillData={fillData}
			/>
		</div>
	);
};

export default ExpiringPrescriptionScreen
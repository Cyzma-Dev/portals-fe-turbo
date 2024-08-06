import React, { useState } from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import { CustomColumnDef } from "@repo/common/common-library";
import FilterFields from "../../../../../../packages/ui/src/components/filter-fields";
import { IRxArchiveList } from "./types";
import { PatientRxArchiveColumns } from "./PatientRxArchiveColumns";
import RxFullHistory from "./rxFullHistory";
import IconWrapper from "../../../../../../packages/ui/src/components/Icon-wrapper";



interface IPatientRxArchiveProps {
	RxArchiveListData: IRxArchiveList[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	filterOpen: boolean
	setFilterOpen: (data: boolean) => void
	isGridDataLoading: boolean
	gridCount: number
}

const PatientRxArchiveScreen = (props: IPatientRxArchiveProps) => {
	const [refillHeaderDetails, setRefillHeaderDetails] = useState<any>(null);
	const [fillData, setFillData] = useState<IPatientRxArchiveProps[]>([]);
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
		...PatientRxArchiveColumns,

	]

	return (
		<div className='flex flex-col gap-4 w-full h-full'>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Rx Archive
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
					listColumns={PatientRxArchiveColumns}
					options={[]}
				/>
			}
			<DataTable
				data={props.RxArchiveListData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
				gridCount={props.gridCount}
				loading={props.isGridDataLoading}
			/>
			<RxFullHistory
				fullScreenDialog={fullScreenDialog}
				setFullScreenDialog={setFullScreenDialog}
				refillHeaderDetails={refillHeaderDetails}
				fillData={fillData}
			/>
		</div>
	);
};

export default PatientRxArchiveScreen
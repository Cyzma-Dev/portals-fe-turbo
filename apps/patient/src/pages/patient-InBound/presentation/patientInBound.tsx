import React from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import { useState } from 'react';
import { CustomColumnDef, NewTabPdfViewer } from "@repo/common/common-library";
import { PatientInBoundColumns } from "./PatientInBoundColumns";
import FilterFields from "../../../../../../packages/ui/src/components/filter-fields";
import IconWrapper from "../../../../../../packages/ui/src/components/Icon-wrapper";
import { toast } from "sonner";
import DownloadPdf from "./downloadPdf";
import { IInBoundList } from "./types";
interface IPatientInBoundProps {
	inBoundListData: IInBoundList[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
}

const PatientInBoundScreen = (props: IPatientInBoundProps) => {

	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [clickedActionRowData, setClickedActionRowData] = useState<any>(null);
	const [fullScreenDialog, setFullScreenDialog] = useState<boolean>(false);
	const [pdfOpenLoading, setPdfOpenLoading] = useState<boolean>(false);

	const extendColumns: CustomColumnDef<any>[] = [
		{
			accessorKey: "action",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Request Status" />
			),
			cell: ({ row }) => <div className="w-fit">{row.getValue("action")}</div>,
			enableSorting: true,
			enableHiding: false,
		},
		{
			id: "document_type",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Format" />
			),
			cell: ({ row }) => {
				return (
					<div className="w-fit flex gap-3 items-center">
						{
							pdfOpenLoading && (row.original.rec_id === clickedActionRowData.rec_id)
								?
								<IconWrapper>
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								</IconWrapper>
								:
								<IconWrapper
									className="cursor-pointer hover:text-blue hover:fill-blueBackground hover:bg-blueBackground"
									onClick={async () => {
										setPdfOpenLoading(true)
										setClickedActionRowData(row.original)
										const response = await NewTabPdfViewer(row.original.rec_id)
										if (response) {
											toast.error(response)
										}
										setPdfOpenLoading(false)
									}}
								>
									PDF
								</IconWrapper>
						}

						<IconWrapper
							className="cursor-pointer hover:text-blue hover:fill-blueBackground hover:bg-blueBackground"
							onClick={() => {
								setFullScreenDialog(true)
								setClickedActionRowData(row.original)
							}}
						>
							<Icons.arrowDown className="h-5 w-5 border border-gray-300 border-dashed rounded-full" />
						</IconWrapper>

					</div>
				)
			},
		},
		...PatientInBoundColumns,

	]

	return (
		<div
			className='flex flex-col gap-4 w-full h-full'
		>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				In Bound
				<div className='flex gap-1'>
					<Button variant="ghost" size="sm" className="flex gap-1" onClick={() => setFilterOpen(!filterOpen)}>
						<Icons.listFilter className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{filterOpen
				&&
				<FilterFields
					filterOpen={filterOpen}
					handleFilterChange={props.handleFilterChange}
					listColumns={PatientInBoundColumns}
					options={[]}
				/>
			}
			<DataTable
				data={props.inBoundListData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
			<DownloadPdf
				fullScreenDialog={fullScreenDialog}
				setFullScreenDialog={setFullScreenDialog}
				clickedActionRowData={clickedActionRowData}
			/>
		</div>
	);
};

export default PatientInBoundScreen
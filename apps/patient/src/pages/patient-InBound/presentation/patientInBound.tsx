import React from "react";
import { Button, CommonDownloadPdf, DataTable, DataTableColumnHeader, Icons, NotesTooltipViewer } from "@repo/ui/shadcn";
import { useState } from 'react';
import { CustomColumnDef, DownloadPdfDocument, NewTabPdfViewer } from "@repo/common/common-library";
import { PatientInBoundColumns } from "./PatientInBoundColumns";
import FilterFields from "../../../../../../packages/ui/src/components/filter-fields";
import IconWrapper from "../../../../../../packages/ui/src/components/Icon-wrapper";
import { toast } from "sonner";
import { IInBoundList } from "./types";



interface IPatientInBoundProps {
	inBoundListData: IInBoundList[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	filterOpen: boolean
	setFilterOpen: (data: boolean) => void
	isGridDataLoading: boolean
	gridCount: number
}

const PatientInBoundScreen = (props: IPatientInBoundProps) => {
	const [clickedActionRowData, setClickedActionRowData] = useState<any>(null);
	const [fullScreenDialog, setFullScreenDialog] = useState<boolean>(false);
	const [pdfOpenLoading, setPdfOpenLoading] = useState<boolean>(false);
	const rec_id = clickedActionRowData?.rec_id
	const fileName = `${clickedActionRowData?.patient_name}_${clickedActionRowData?.rx_number}`
	const extendColumns: CustomColumnDef<any>[] = [
		{
			accessorKey: "action",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Request Status" />
			),
			cell: ({ row }) =>
				<NotesTooltipViewer
					header={`Reason for ${row.getValue("action")}`}
					Content={row.original.note}
					statusValue={row.getValue("action")}
				/>,
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
									className="cursor-pointer hover:text-blue hover:underline"
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
							<Icons.circleArrowDownIcon className="h-5 w-5" />
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
					listColumns={PatientInBoundColumns}
					options={[]}
				/>
			}
			<DataTable
				data={props.inBoundListData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
				loading={props.isGridDataLoading}
				gridCount={props.gridCount}
			/>
			<CommonDownloadPdf
				fullScreenDialog={fullScreenDialog}
				setFullScreenDialog={setFullScreenDialog}
				rec_id={rec_id}
				fileName={fileName}
				downloadPdfDocument={DownloadPdfDocument}
			/>


		</div>
	);
};

export default PatientInBoundScreen
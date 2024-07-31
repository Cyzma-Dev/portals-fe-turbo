import React from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import FilterFields from '../../../../../ui/src/components/filter-fields';
import { useState } from 'react';
import { CustomColumnDef } from "../../../utility";
import { documentColumns } from "./documentscolumns";
import { IDocumentsCommonProps, IPatientDocument } from "./type";
import { AddDocumentsNotes } from "./addDocuments";
import { PreviewDocuments } from "./previewDocuments";
import IconWrapper from "../../../../../ui/src/components/Icon-wrapper";
interface IDocumentsNotesProps extends IDocumentsCommonProps {
	patientDocumentsData: IPatientDocument[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientDocument) => void;
	handleDocumentNoteDelete: (rec_id: number) => void;
	handlePreviewDocuments: (item: any) => void;
	viewerFile: any
	previewSheetOpen: boolean
	setPreviewSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
	filterOpen: boolean
	setFilterOpen: (data: boolean) => void
}

const PatientDocumentScreen = (props: IDocumentsNotesProps) => {
	const [recId, setRecId] = useState<number | null>(null);

	const extendColumns: CustomColumnDef<any>[] = [
		{
			id: "actions",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Actions" />
			),
			cell: ({ row }) => {
				return (
					<div className="w-fit flex gap-2">
						<IconWrapper
							className="cursor-pointer hover:text-blue hover:fill-blueBackground hover:bg-blueBackground"
							onClick={() => {
								props.handleEdit(row.original)
							}}
						>
							<Icons.pencil className="h-4 w-4" />
						</IconWrapper>
						<IconWrapper
							className="cursor-pointer hover:text-red hover:fill-redBackground hover:bg-redBackground"
							onClick={() => {
								props.handleDocumentNoteDelete(row.original.id)
							}}
						>
							<Icons.trash className="h-4 w-4" />
						</IconWrapper>
						{props.isLoading && (row.original.id === recId)
							?
							<IconWrapper>
								<Icons.spinner className="h-4 w-4 animate-spin" />
							</IconWrapper>
							:
							<IconWrapper
								className="cursor-pointer hover:text-green hover:fill-greenBackground hover:bg-greenBackground"
								onClick={() => {
									props.handlePreviewDocuments(row.original)
									setRecId(row.original.id)
								}}
							>
								<Icons.scanEye className="h-4 w-4" />
							</IconWrapper>
						}
					</div>
				)
			},
		},
		...documentColumns,
	]

	return (

		<div
			className='flex flex-col gap-4 w-full h-full'
		>
			<div className='flex gap-4 justify-content items-center text-md font-bold'>
				Documents
				<div className='flex gap-1'>
					<Button variant="secondary" size="sm" className="flex gap-1" onClick={props.openSheet}>
						Add
					</Button>

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
					listColumns={documentColumns}
					options={[]}
				/>
			}
			<AddDocumentsNotes
				sheetOpen={props.sheetOpen}
				setSheetOpen={props.setSheetOpen}
				isEdit={props.isEdit}
				setIsEdit={props.setIsEdit}
				openSheet={props.openSheet}
				currentNotes={props.currentNotes}
				setCurrentNotes={props.setCurrentNotes}
				handleSubmit={props.handleSubmit}
				isLoading={props.isLoading}
				isBtnDisable={props.isBtnDisable}
			/>
			<PreviewDocuments
				previewSheetOpen={props.previewSheetOpen}
				setPreviewSheetOpen={props.setPreviewSheetOpen}
				viewerFile={props.viewerFile}
			/>

			<DataTable
				data={props.patientDocumentsData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
		</div>

	)
};

export default PatientDocumentScreen
import React from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import FilterFields from '../../../../../ui/src/components/filter-fields';
import { useState } from 'react';
import { CustomColumnDef } from "../../../utility";
import { documentColumns } from "./documentscolumns";
import { IDocumentsCommonProps, IPatientDocument } from "./type";
import { AddDocumentsNotes } from "./addDocuments";
interface IDocumentsNotesProps extends IDocumentsCommonProps {
	patientDocumentsData: IPatientDocument[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientDocument) => void;
	handleDocumentNoteDelete: (rec_id: number) => void;
}

const PatientDocumentScreen = (props: IDocumentsNotesProps) => {
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const extendColumns: CustomColumnDef<any>[] = [
		...documentColumns,
		{
			id: "actions",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Actions" />
			),
			cell: ({ row }) => {
				return (
					<div className="w-fit flex gap-4">
						<Icons.pencil
							className="cursor-pointer h-4 w-4 hover:text-red/90 hover:fill-redBackground hover:bg-red/10"
							onClick={() => {
								props.handleEdit(row.original)
							}}
						/>
						<Icons.trash
							className="cursor-pointer h-4 w-4"
							onClick={() => {
								props.handleDocumentNoteDelete(row.original.id)
							}}
						/>
					</div>
				)
			},
		},
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

					<Button variant="ghost" size="sm" className="flex gap-1" onClick={() => setFilterOpen(!filterOpen)}>
						<Icons.listFilter className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{filterOpen
				?
				<FilterFields
					filterOpen={filterOpen}
					handleFilterChange={props.handleFilterChange}
					listColumns={documentColumns}
					options={[]}
				/>
				:
				''
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

			<DataTable
				data={props.patientDocumentsData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
		</div>
	);
};

export default PatientDocumentScreen
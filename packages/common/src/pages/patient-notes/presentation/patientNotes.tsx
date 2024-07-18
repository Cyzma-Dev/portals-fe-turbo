import {Button, DataTable, DataTableColumnHeader, Icons} from "@repo/ui/shadcn";
import { notesColumns } from './notesColumns';
import FilterFields from '../../../../../ui/src/components/filter-fields';
import { useState } from 'react';
import { AddPatientNotes } from './addPatientNotes';
import { INotesCommonProps, IPatientNotes } from './types';
import { CustomColumnDef } from "../../../utility";
interface IPatientNotesProps extends INotesCommonProps{
	patientNotesData: IPatientNotes[];
	handleGridChange: (event:any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientNotes) => void;
	handlePatientNoteDelete: (rec_id: number) => void;
}

const PatientNotesScreen = (props: IPatientNotesProps) => {
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const extendColumns: CustomColumnDef<any>[] = [
		...notesColumns,
		{
			id: "actions",
			header: ({ column }) => (
			  <DataTableColumnHeader column={column} title="Actions" />
			),
			cell: ({ row }) => {
			  return(
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
							props.handlePatientNoteDelete(row.original.id)
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
				Notes		
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
						listColumns={notesColumns}
						options={[]}
					/>
				:
					''
			}

			<AddPatientNotes
				sheetOpen={props.sheetOpen}
				setSheetOpen={props.setSheetOpen}
				openSheet={props.openSheet}
				isEdit={props.isEdit}
				setIsEdit={props.setIsEdit}
				isLoading={props.isLoading}
				setIsLoading={props.setIsLoading}
				isBtnDisable={props.isBtnDisable}
				setIsBtnDisable={props.setIsBtnDisable}
				handleSubmit={props.handleSubmit}
				currentNotes={props.currentNotes}
				setCurrentNotes={props.setCurrentNotes}
			/>

			<DataTable
				data={props.patientNotesData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
		</div>
	);
};

export default PatientNotesScreen
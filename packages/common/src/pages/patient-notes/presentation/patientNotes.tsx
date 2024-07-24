import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import { notesColumns } from './notesColumns';
import FilterFields from '../../../../../ui/src/components/filter-fields';
import { AddPatientNotes } from './addPatientNotes';
import { INotesCommonProps, IPatientNotes } from './types';
import { CustomColumnDef } from "../../../utility";
import IconWrapper from "../../../../../ui/src/components/Icon-wrapper";
interface IPatientNotesProps extends INotesCommonProps {
	patientNotesData: IPatientNotes[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientNotes) => void;
	handlePatientNoteDelete: (rec_id: number) => void;
	filterOpen: boolean;
	setFilterOpen: (data: boolean) => void
}

const PatientNotesScreen = (props: IPatientNotesProps) => {

	const extendColumns: CustomColumnDef<any>[] = [
		{
			id: "actions",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Actions" />
			),
			cell: ({ row }) => {
				return (
					<div className="w-fit flex gap-4">
						<IconWrapper
							className="cursor-pointer hover:text-blue hover:fill-blueBackground hover:bg-blueBackground"
							onClick={() => {
								props.handleEdit(row.original)
							}}
							disable={!row.original.is_editable}
						>
							<Icons.pencil className="h-4 w-4" />
						</IconWrapper>
						<IconWrapper
							className="cursor-pointer hover:text-red hover:fill-redBackground hover:bg-redBackground"
							onClick={() => {
								props.handlePatientNoteDelete(row.original.id)
							}}
							disable={!row.original.is_editable}
						>
							<Icons.trash className="h-4 w-4" />
						</IconWrapper>
					</div>
				)
			},
		},
		...notesColumns,
	]

	return (
		<div className='flex flex-col gap-4 w-full h-full'>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Notes
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
				?
				<FilterFields
					filterOpen={props.filterOpen}
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
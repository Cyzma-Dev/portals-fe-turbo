import React from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import { IAllergiesCommonProps, IPatientAllergies } from './types';
import FilterFields from "../../../../../../ui/src/components/filter-fields";
import { CustomColumnDef } from "../../../../utility";
import IconWrapper from "../../../../../../ui/src/components/Icon-wrapper";
import { AddPatientAllergies } from "./addPatientAllergies";
import { allergiesColumns } from "./allergiesColumns";
interface IPatientAllergiesProps extends IAllergiesCommonProps {
	patientAllergiesData: IPatientAllergies[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientAllergies) => void;
	handlePatientAllergiesDelete: (rec_id: number) => void;
	filterOpen: boolean;
	setFilterOpen: (data: boolean) => void
	isGridDataLoading: boolean
	gridCount: number
}

const PatientAllergiesScreen = (props: IPatientAllergiesProps) => {

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
								props.handlePatientAllergiesDelete(row.original.id)
							}}
						>
							<Icons.trash className="h-4 w-4" />
						</IconWrapper>
					</div>
				)
			},
		},
		...allergiesColumns,
	]

	return (
		<div className='flex flex-col gap-4 w-full h-full'>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Allergies
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
					listColumns={allergiesColumns}
					options={[]}
				/>
				:
				''
			}

			<AddPatientAllergies
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
				currentAllergies={props.currentAllergies}
				setCurrentAllergies={props.setCurrentAllergies}
			/>

			<DataTable
				data={props.patientAllergiesData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
				gridCount={props.gridCount}
				loading={props.isGridDataLoading}
			/>
		</div>
	);
};

export default PatientAllergiesScreen
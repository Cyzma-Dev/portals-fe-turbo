import React from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import { IComorbidCommonProps, IPatientComorbid } from './types';
import FilterFields from "../../../../../../ui/src/components/filter-fields";
import { CustomColumnDef } from "../../../../utility";
import IconWrapper from "../../../../../../ui/src/components/Icon-wrapper";
import { comorbidColumns } from "./comorbidColumns";
import { AddPatientComorbidConditions } from "./addPatientComorbid";
interface IPatientComorbidProps extends IComorbidCommonProps {
	patientComorbidConditionsData: IPatientComorbid[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientComorbid) => void;
	handlePatientComorbidDelete: (rec_id: number) => void;
	filterOpen: boolean;
	setFilterOpen: (data: boolean) => void
}

const PatientComorbidConditionsScreen = (props: IPatientComorbidProps) => {

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
								props.handlePatientComorbidDelete(row.original.id)
							}}
							disable={!row.original.is_editable}
						>
							<Icons.trash className="h-4 w-4" />
						</IconWrapper>
					</div>
				)
			},
		},
		...comorbidColumns,
	]

	return (
		<div className='flex flex-col gap-4 w-full h-full'>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Comorbid Conditions
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
					listColumns={comorbidColumns}
					options={[]}
				/>
				:
				''
			}

			<AddPatientComorbidConditions
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
				currentComorbidConditions={props.currentComorbidConditions}
				setCurrentComorbidConditions={props.setCurrentComorbidConditions}
			/>

			<DataTable
				data={props.patientComorbidConditionsData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
			/>
		</div>
	);
};

export default PatientComorbidConditionsScreen
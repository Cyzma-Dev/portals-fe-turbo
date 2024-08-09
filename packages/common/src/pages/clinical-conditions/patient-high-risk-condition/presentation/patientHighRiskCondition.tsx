import React from "react";
import { Button, DataTable, DataTableColumnHeader, Icons } from "@repo/ui/shadcn";
import { IHighRiskCommonProps, IPatientHighRisk } from './types';
import FilterFields from "../../../../../../ui/src/components/filter-fields";
import { CustomColumnDef } from "../../../../utility";
import IconWrapper from "../../../../../../ui/src/components/Icon-wrapper";
import { highRiskColumns } from "./HighRiskColumns";
import { AddPatientHighRisk } from "./addPatientHighRisk";
interface IPatientHighRiskProps extends IHighRiskCommonProps {
	patientHighRiskData: IPatientHighRisk[];
	handleGridChange: (event: any) => void;
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleEdit: (row: IPatientHighRisk) => void;
	handlePatientHighRiskConditionsDelete: (rec_id: number) => void;
	filterOpen: boolean;
	setFilterOpen: (data: boolean) => void
	isGridDataLoading: boolean
	gridCount: number
}

const PatientHighRiskConditionScreen = (props: IPatientHighRiskProps) => {

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
						>
							<Icons.pencil className="h-4 w-4" />
						</IconWrapper>
						<IconWrapper
							className="cursor-pointer hover:text-red hover:fill-redBackground hover:bg-redBackground"
							onClick={() => {
								props.handlePatientHighRiskConditionsDelete(row.original.id)
							}}
						>
							<Icons.trash className="h-4 w-4" />
						</IconWrapper>
					</div>
				)
			},
		},
		...highRiskColumns,
	]

	return (
		<div className='flex flex-col gap-4 w-full h-full'>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				High Risk Condition
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
					listColumns={highRiskColumns}
					options={[]}
				/>
				:
				''
			}

			<AddPatientHighRisk
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
				currentHighRiskCondition={props.currentHighRiskCondition}
				setCurrentHighRiskCondition={props.setCurrentHighRiskCondition}
			/>

			<DataTable
				data={props.patientHighRiskData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
				gridCount={props.gridCount}
				loading={props.isGridDataLoading}
			/>
		</div>
	);
};

export default PatientHighRiskConditionScreen
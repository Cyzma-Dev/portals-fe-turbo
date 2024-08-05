import { useNavigate } from 'react-router-dom';
import { IPatientDetails } from './types';
import FilterFields from '../../../../../../packages/ui/src/components/filter-fields';
import { patientListingColumns } from './patient-listing-columns';
import { Button, DataTable, DataTableColumnHeader, Icons } from '@repo/ui/shadcn';
import { CustomColumnDef } from '@repo/common/common-library';
interface PatientListingProps {
	patientListingData: IPatientDetails[];
	handleFilterChange: (field: string, operator: string, event: any) => void;
	handleGridChange: (data: any) => void;
	filterOpen: boolean;
	setFilterOpen: (data: boolean) => void
	isGridDataLoading: boolean
	gridCount: number
}

const PatientListing = (props: PatientListingProps) => {
	const history = useNavigate();

	const toDetails = (details: any) => {
		history(`/patientProfile/${details.id}/`, { state: details });
	};

    const extendColumns: CustomColumnDef<any>[] = [
		{
			id: "actions",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Actions" />
			),
			cell: ({ row }) => {
				return (
					<div className="w-fit flex gap-4">
						<Button
                            size={'sm'}
                            onClick={() => {
                                toDetails(row.original);
                            }}
                        >
                            Patient Details
                        </Button>
					</div>
				)
			},
		},
		...patientListingColumns,
	]

	return (
		<div className='flex flex-col gap-4 w-full h-full'>
			<div className='flex gap-4 justify-content items-center text-xl font-bold'>
				Patient Listing
				<div className='flex gap-1'>
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
					listColumns={patientListingColumns}
					options={[]}
				/>
				:
				''
			}

            <DataTable
				data={props.patientListingData}
				columns={extendColumns}
				toolbar={false}
				handleGridChange={props.handleGridChange}
				loading={props.isGridDataLoading}
				gridCount={props.gridCount}
			/>
		</div>
	);
};

export default PatientListing;

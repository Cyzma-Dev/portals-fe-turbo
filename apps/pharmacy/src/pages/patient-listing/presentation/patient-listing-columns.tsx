import { CustomColumnDef } from "@repo/common/common-library";
import { DataTableColumnHeader } from "@repo/ui/shadcn";

export const patientListingColumns: CustomColumnDef<any>[] = [
  {
    accessorKey: "patient_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Patient Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient Name" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("patient_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "physicians",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Physicians',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Physicians" />
    ),
    cell: ({ row }) => {
      const commaSeparatedString: [] = row.getValue("physicians");
      console.log('asdsa =', commaSeparatedString.join(', '))
      return(
        <div className="w-fit">{commaSeparatedString.join(', ')}</div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "mrn",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Mrn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mrn" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("mrn")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "dob",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOB" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("dob")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "mobile_phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile Phone" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("mobile_phone_number")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("gender")}</div>,
    enableSorting: true,
    enableHiding: false,
  }
];

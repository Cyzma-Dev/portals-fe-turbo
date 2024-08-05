import { CustomColumnDef } from "@repo/common/common-library";
import { DataTableColumnHeader } from "@repo/ui/shadcn";

export const notesColumns: CustomColumnDef<any>[] = [
  {
    accessorKey: "subject_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Subject',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("subject_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "note_text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("note_text")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "created_by_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("created_by_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "created_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("created_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "updated_by_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated By" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("updated_by_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "updated_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("updated_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  }
];

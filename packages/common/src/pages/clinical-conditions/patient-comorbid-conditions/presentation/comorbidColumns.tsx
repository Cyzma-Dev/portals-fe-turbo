import React from "react";
import { DataTableColumnHeader } from "@repo/ui/shadcn";
import { CustomColumnDef } from "../../../../utility";


export const comorbidColumns: CustomColumnDef<any>[] = [
  {
    accessorKey: "comorbid_condition_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Condition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condition" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("comorbid_condition_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("notes")}</div>,
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
    accessorKey: "updated_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("updated_date")}</div>,
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
    accessorKey: "updated_by_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated By" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("updated_by_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  }
];

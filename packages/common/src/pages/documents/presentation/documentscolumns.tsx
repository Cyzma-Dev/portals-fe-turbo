import React from "react";
import { DataTableColumnHeader } from "../../../../../ui/src/components/data-table";
import { CustomColumnDef } from "../../../utility";

export const documentColumns: CustomColumnDef<any>[] = [
  {
    accessorKey: "document_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Document Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document Name" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("document_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Record ID" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "document_type",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Document Type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document Type" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("document_type")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "subject_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Document Subject',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document Subject" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("subject_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  
];

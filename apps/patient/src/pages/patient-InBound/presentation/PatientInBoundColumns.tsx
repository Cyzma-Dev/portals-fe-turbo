import React from "react";
import { CustomColumnDef } from "@repo/common/common-library";
import { DataTableColumnHeader } from "@repo/ui/shadcn";

export const PatientInBoundColumns: CustomColumnDef<any>[] = [
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
    accessorKey: "physician_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Physician Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Physician Name" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("physician_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "request_type",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("request_type")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "rx_number",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Rx Number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rx Number" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("rx_number")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "drug_name",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Drug Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Drug Name" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("drug_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: "rx_filled_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filled Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("rx_filled_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "created_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date and Time Received" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("created_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "sender_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent by" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("sender_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "updated_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated Date and Time" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("updated_date")}</div>,
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("status")}</div>,
    enableSorting: true,
    enableHiding: false,
  },

];

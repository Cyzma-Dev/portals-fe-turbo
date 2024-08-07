import React from "react";
import { DataTableColumnHeader } from "@repo/ui/shadcn";
import { CustomColumnDef } from "../../../../utility";


export const prescriptionColumns: CustomColumnDef<any>[] = [
  {
    accessorKey: "rx_number",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'Rx',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rx" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("rx_number")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "ndc",
    toFilter: true,
    searchType: 'text',
    operator: 'contains',
    headerName: 'NDC',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NDC" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("ndc")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    toFilter: true,
    accessorKey: "drug_name",
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
    accessorKey: "written_refills",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Written Fills" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("written_refills")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "times_filled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Times Filled" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("times_filled")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "refill_remaining",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Refill Remaining'" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("refill_remaining")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "written_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Written Quantity" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("written_quantity")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "remaining_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Quantity" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("remaining_quantity")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "days_supply",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days Supply'" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("days_supply")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "last_fill_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Filled Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("last_fill_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "next_fill_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Fill Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("next_fill_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "written_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Written Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("written_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "expiration_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration Date" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("expiration_date")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "physician_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Physician" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("physician_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "pharmacy_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pharmacy" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("pharmacy_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },


];

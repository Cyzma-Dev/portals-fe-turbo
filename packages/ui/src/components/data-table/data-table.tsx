"use client"

import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Updater,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcn/ui/table"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "./data-table-pagination"
import { Icons } from "../icons"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  toolbar: boolean
  gridCount: number;
  loading?: boolean;
  handleGridChange?: (updater: Updater<PaginationState>) => void
  gridColor?: 'bg-background'
}

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbar,
  handleGridChange,
  gridCount,
  loading,
  gridColor,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Log state changes
  const handleRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    setRowSelection((old) => {
      const newState = typeof updater === 'function' ? updater(old) : updater;
      console.log("Row Selection Changed: ", newState);
      return newState;
    })
  }

  const handleSortingChange = (updater: Updater<SortingState>) => {
    setSorting((old) => {
      const newState = typeof updater === 'function' ? updater(old) : updater;
      console.log("Sorting Changed: ", newState);
      return newState;
    })
  }

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    setColumnFilters((old) => {
      const newState = typeof updater === 'function' ? updater(old) : updater;
      console.log("Column Filters Changed: ", newState);
      return newState;
    })
  }

  const handleColumnVisibilityChange = (updater: Updater<VisibilityState>) => {
    setColumnVisibility((old) => {
      const newState = typeof updater === 'function' ? updater(old) : updater;
      console.log("Column Visibility Changed: ", newState);
      return newState;
    })
  }

  // const handlePaginationChange = (updater: Updater<PaginationState>) => {
  //   let newState: PaginationState = {
  //     'pageIndex': 0,
  //     'pageSize': 10
  //   }
  //   setPagination((old) => {
  //     newState = typeof updater === 'function' ? updater(old) : updater;
  //     return newState;
  //   })
  //   handleGridChange(newState)
  // }

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  React.useEffect(() => {
    handleGridChange &&
      handleGridChange(pagination);
  }, [pagination])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
    manualPagination: true,
    rowCount: gridCount,
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  return (
    <div className="space-y-4">
      {toolbar ? <DataTableToolbar table={table} /> : ''}
      <div className={`rounded-md border ${gridColor}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex justify-center items-center h-full">
                    <Icons.spinner className="h-6 w-6 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

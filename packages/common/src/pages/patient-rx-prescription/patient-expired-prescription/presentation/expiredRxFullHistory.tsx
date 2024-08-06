import React from 'react'
import { CustomColumnDef } from '@repo/common/common-library'
import { DataTable, DataTableColumnHeader, Popup } from '@repo/ui/shadcn'

interface IRxFullHistoryProps {
    fullScreenDialog: boolean
    setFullScreenDialog: (data: boolean) => void
    refillHeaderDetails: any
    fillData: any[]

}

function ExpiredRxFullHistory(props: IRxFullHistoryProps) {
    const gridCount = props.fillData.length

    const dataTableColumns: CustomColumnDef<any>[] = [
        {
            accessorKey: "fill_number",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Fill No" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("fill_number")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "fill_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Fill Date" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("fill_date")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "fill_expiration_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Expiration Date" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("fill_expiration_date")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "fill_quantity",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Fill Quantity" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("fill_quantity")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "ship_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Shipping Date" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("ship_date")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "shipping_method",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Shipping Method" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("shipping_method")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "shipping_carrier",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Shipping Carrier" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("shipping_carrier")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "shipping_tracking_number",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tracking #'" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("shipping_tracking_number")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "additional_comments",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Additional Comments" />
            ),
            cell: ({ row }) => <div className="w-fit">{row.getValue("additional_comments")}</div>,
            enableSorting: true,
            enableHiding: false,
        }
    ]

    const Header = () => {
        return(
            <div className="flex gap-12 font-bold mb-4 w-full">
                <h2 className='text-lg'>Fill History</h2>
                <div className='flex flex-col justify-start items-start'>
                    <span>Rx Number</span>
                    <span className='text-blue text-sm'>{props.refillHeaderDetails?.rx_number}</span>
                </div>
                <div className='flex flex-col justify-start items-start'>
                    <h1 className='text-text-base'>Drug Name</h1>
                    <span className='text-blue text-sm'>{props.refillHeaderDetails?.drug_name}</span>
                </div>
            </div>
        )
    }

    return (
        <Popup
            fullScreenDialog={props.fullScreenDialog}
            setFullScreenDialog={props.setFullScreenDialog}
            // title="Preview"
            header={<Header/>}
        >
            <DataTable
                data={props.fillData}
                columns={dataTableColumns}
                toolbar={false}
                gridColor='bg-background'
                gridCount={gridCount}
            />
        </Popup>
    )
}

export default ExpiredRxFullHistory

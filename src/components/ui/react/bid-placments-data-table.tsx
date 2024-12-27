import * as React from "react"
import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/react/button"
import { Checkbox } from "@/components/ui/react/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/react/dropdown-menu"
import { Input } from "@/components/ui/react/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/react/table"
import { Badge } from "./badge"
import { formatTime } from "@/utilities/helpers/time-formatter"


export type BidPlacement = {
    id: number;
    contractor: {
        companyName: string
    }
    tender: {
        title: string;
        endDate: Date;
    }
    status: "placed" | "accepted" | "rejected";
    createdAt: Date;
};

export function BidPlacementDataTable({ data, role }: { data: any, role: string }) {

    const columns: ColumnDef<BidPlacement>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Id",
            cell: ({ row }) => (
                <div className="capitalize">{`POL eRFX-B`+row.getValue("id")}</div>
            ),
        },
        {
            accessorKey: "contractor.companyName",
            header: "Vendor",
            cell: ({ row }) => (
                <div className="capitalize text-clip">{row?.original?.contractor?.companyName}</div>
            ),
        },
        {
            accessorKey: "tender.title",
            header: "Tender",
            cell: ({ row }) => (
                <div className="capitalize">{row?.original?.tender?.title}</div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Submission Date",
            cell: ({ row }) => (
                <div className="capitalize">{formatTime(row.getValue("createdAt"))}</div>
            ),
        },
        // {
        //     accessorKey: "endDate",
        //     header: "End Date",
        //     cell: ({ row }) => (
        //         <div className="capitalize">{formatTime(row?.original?.tender?.endDate)}</div>
        //     ),
        // },
        {
            accessorFn: (row) => row.status,
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Bid Order
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ getValue }) => (String(getValue()) === 'placed' ? <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200 uppercase">{String(getValue())}</Badge> : String(getValue()) === 'rejected' ? <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[10px] text-slate-200 uppercase">{String(getValue())}</Badge> : String(getValue()) === 'accepted' ? <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[10px] text-slate-200 uppercase">{String(getValue())}</Badge> : <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200 uppercase">{`Error`}</Badge>)
        },
        {
            id: "actions",
            enableHiding: false,
            header: () => <div className="text-right">Action</div>,
            cell: ({ row }) => {

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="float-right">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <a href={`/u/${role}/bids/manage/${Number(row.original.id)}`}
                                    className={new Date(row?.original?.tender?.endDate).getTime() > new Date().getTime() ? "pointer-events-none opacity-50" : ""}
                                >
                                    Manage Bid
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];


    const [sorting, setSorting] = React.useState<SortingState>([
        {id: 'id', desc: true}
    ])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })



    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Filter vendor..."
                    
                    value={(table.getColumn('contractor_companyName')?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("contractor_companyName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white dark:bg-background-color"
                />
                <Input
                    placeholder="Filter tender..."
                    value={(table.getColumn("tender_title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("tender_title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white dark:bg-background-color"
                />
            </div>
            <div className="rounded-md border dark:border-gray-700">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="py-6 bg-slate-200 text-foreground dark:bg-background-color">
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
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="dark:bg-foreground"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="dark:bg-foreground"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

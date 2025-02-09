import * as React from "react"
import {
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



export type BidPlacement = {
    id: number;
    tender: {
        title: string;
        status: string;
    }
    bids: any[];
};

export function BidGroupingDataTable({ data, role }: { data: any, role: string }) {


    const columns: ColumnDef<BidPlacement>[] = [
        {
            accessorKey: "id",
            header: "Id",
            cell: ({ row }) => (
                <div className="capitalize">{`${`PTID`+row.getValue("id")}`}</div>
            ),
        },
        {
            accessorKey: "tender.title",
            header: "Tender (Grouped)",
            cell: ({ row }) => (
                <div className="capitalize">{row?.original?.tender?.title}</div>
            ),
        },
        {
            accessorKey: "tender.status",
            header: "Status",
            // cell: ({ row }) => (
            //     <div className="capitalize">{row?.original?.tender?.status}</div>
            // ),
            cell: ({ getValue }) => (String(getValue()) === 'sent' ? <p className="text-primary uppercase font-semibold">{String(getValue())}</p> : String(getValue()) === 'closed' ? <p className="text-red-600 uppercase font-semibold">{String(getValue())}</p> : String(getValue()) === 'open' ? <p className="text-green-600 uppercase font-semibold">{String(getValue())}</p> : <p className="text-amber-600 uppercase font-semibold">{`Pending`}</p>)
        },
        {
            accessorKey: "bids",
            header: "Bids",
            cell: ({ row }) => (
                <div className="capitalize">{row?.original?.bids?.length}</div>
            ),
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
                                <a href={`/u/${role}/bids/view/${row?.original?.id}`}>
                                    View Bids
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

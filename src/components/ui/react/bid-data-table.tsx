import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
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
    DropdownMenuCheckboxItem,
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

export type Bid = {
    id: number;
    status: "pending" | "open" | "closed" | "sent";
    tender: {
        id: number;
        title: string;
        description: string;
        location: string;
        startDate: Date;
        endDate: Date;
        submissionDate: Date;
        lastUpdatedDate: Date;
        BidPlacement?: any[];
    },
    bid_order: "placed" | "Not placed"
};

export function BidsDataTable({ data }: { data: any }) {

    //sort data in descending order
    const sortedData = React.useMemo(() => {
        return [...data].sort((a, b) => new Date(b.tender.submissionDate).getTime() - new Date(a.tender.submissionDate).getTime());
    }, [data]);

    console.log(sortedData)

    const columns: ColumnDef<Bid>[] = [
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
            accessorKey: "tender.id",
            header: "Id",
            cell: ({ row }) => (
                <div className="capitalize">{`POL eRFX-T${row.original.tender.id}`}</div>
            ),
        },
        {
            accessorKey: "tender.title",
            header: "Title",
            cell: ({ row }) => (
                <div className="capitalize text-clip">{row.original.tender.title}</div>
            ),
        },
        {
            accessorKey: "tender.location",
            header: "Location",
            cell: ({ row }) => (
                <div className="capitalize">{row.original.tender.location}</div>
            ),
        },
        {
            accessorKey: "tender.startDate",
            header: "Start date",
            cell: ({ row }) => (
                <div className="capitalize">{new Date(row.original.tender.startDate).toDateString()}</div>
            ),
        },
        {
            accessorKey: "tender.endDate",
            header: "End date",
            cell: ({ row }) => (
                <div className="capitalize">{new Date(row.original.tender.endDate).toDateString()}</div>
            ),
        },
        {
            accessorFn: (row) => row.status,
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ getValue }) => (String(getValue()) === 'pending' ? <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200">{String(getValue())}</Badge> : String(getValue()) === 'sent' ? <Badge className="bg-primary hover:bg-primary px-4 text-[10px] text-slate-200">{String(getValue())}</Badge> : String(getValue()) === 'closed' ? <Badge className="bg-red-600 hover:bg-red-600 px-4 text-[10px] text-slate-200">{String(getValue())}</Badge> : String(getValue()) === 'open' ? <Badge className="bg-green-600 hover:bg-green-600 px-4 text-[10px] text-slate-200">{String(getValue())}</Badge> : <Badge className="bg-gray-500 hover:bg-gray-500 px-4 text-[10px] text-slate-200">{String(getValue())}</Badge>)
        },
        {
            accessorKey: "tender.BidPlacement",
            header: "Bid Order",
            cell: ({ row }) => (
                <div className="capitalize">{row?.original?.tender?.BidPlacement[0]?.status === 'rejected' ? <p className="text-red-600 dark:text-red-400 font-medium text-sm uppercase">{row?.original?.tender?.BidPlacement[0]?.status}</p> :
                (row?.original?.tender?.BidPlacement[0]?.status === 'accepted' || row?.original?.tender?.BidPlacement[0]?.status === 'placed') ? <p className="text-green-600 dark:text-green-400 font-medium text-sm uppercase">{row?.original?.tender?.BidPlacement[0]?.status}</p> : <p className="text-gray-500 dark:text-gray-500 font-medium text-sm uppercase">{`Not Placed`}</p>}</div>
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
                                <a href={`/u/user/tenders/manage/${Number(row.original.id)}`}>Manage Tender</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    
    const table = useReactTable({
        data: sortedData,
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
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter title..."
                    value={table.getColumn("id")?.getFilterValue() as string ?? ''}
                    onChange={(event) => {
                        const column = table.getColumn("id");
                        if (column) {
                            column.setFilterValue(event.target.value);
                        }
                    }}
                    className="max-w-sm bg-white dark:bg-background-color"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-white dark:bg-background-color text-foreground border-0">
                            View <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize dark:bg-unset"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
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

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


export type Tender = {
    id: number;
    title: string;
    description: string;
    status: "pending" | "open" | "closed" | "sent";
    location: string;
    startDate: Date;
    endDate: Date;
    submissionDate: Date;
    lastUpdatedDate: Date;
};

//export 

export function TendersDataTable({ data, role }: { data: any, role: string }) {

    const columns: ColumnDef<Tender>[] = [
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
                <div className="capitalize">{`POL eRFX-T`+row.getValue("id")}</div>
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="capitalize text-clip">{row.getValue("title")}</div>
            ),
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("location")}</div>
            ),
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
            cell: ({ row }) => (
                <div className="capitalize">{new Date(row.getValue("startDate")).toDateString()}</div>
            ),
        },
        {
            accessorKey: "endDate",
            header: "End Date",
            cell: ({ row }) => (
                <div className="capitalize">{new Date(row.getValue("endDate")).toDateString()}</div>
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
                                <a href={`/u/${role}/tenders/manage/${Number(row.original.id)}`}>Manage tender</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];


    const [sorting, setSorting] = React.useState<SortingState>([{id: 'id', desc: true}])
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
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter title..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
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

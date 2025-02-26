import { useEffect, useMemo, useState } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sugar } from "@/inferfaces"
import { CustomBarChart } from "./barChart"


export const columns: ColumnDef<Sugar>[] = [
	// {
	// 	id: "select",
	// 	header: ({ table }) => (
	// 		<Checkbox
	// 			checked={
	// 				table.getIsAllPageRowsSelected() ||
	// 				(table.getIsSomePageRowsSelected() && "indeterminate")
	// 			}
	// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
	// 			aria-label="Select all"
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
	// 	),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: "productName",
		header: "Product Name",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("productName")}</div>
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Price
					<ArrowUpDown />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="capitalize">{Intl.NumberFormat("en-US").format(row.getValue("price"))}/=</div>
		),
	},
	{
		accessorKey: "pricePerKg",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Price / Kg
					<ArrowUpDown />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div>
				{
					!isNaN(row.getValue("pricePerKg")) ? Intl.NumberFormat("en-US").format(row.getValue("pricePerKg")) + '/=' : ""
				}
			</div>
		),
	},
	{
		accessorKey: "size",
		header: "Size",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("size")}</div>
		),
	},
	{
		accessorKey: "discount",
		header: "Discount",
		cell: ({ row }) => (
			<div>{row.getValue("discount")} {row.getValue("discount") as number && "%"}</div>
		),
	},
	{
		accessorKey: "country",
		header: "Country",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("country")}</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const sugar = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="bg-transparent hover:bg-blue-950 hover:text-blue-100">
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="bg-blue-900 text-blue-100 border-blue-900">
						<DropdownMenuItem onClick={() => window.open(sugar.webLink, "_blank")}>Open Link To Product</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]

interface TableProps {
	listOfData: Sugar[]
	date?: string
}

export function CustomTable({ listOfData, date }: TableProps) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
	const [sugarsDisplayed, setSugarsDisplayed] = useState<Sugar[]>()

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	})
	const paginationState = useMemo(() => pagination, [pagination])

	const table = useReactTable<Sugar>({
		data: listOfData,
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
			pagination: paginationState,
		},
		onPaginationChange: (updater) => {
			setPagination((prev) => {
				const newState = typeof updater === "function" ? updater(prev) : updater;
				return newState;
			});
		},
		autoResetPageIndex: false,
	})

	useEffect(() => {
		setSugarsDisplayed?.(table.getRowModel().rows.map((row) => row.original) || [])
	}, [table.getRowModel().rows]);

	return (
		<>
			<div className="w-1/2 mb-10">
				<div className="flex items-center py-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="bg-blue-950 hover:bg-blue-800 text-blue-100">
							<Button variant="ghost" className="ml-auto">
								Columns <ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="bg-blue-950">
							{
								table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem key={column.id} className="capitalize text-blue-100" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
												{column.id}
											</DropdownMenuCheckboxItem>
										)
									})
							}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border-2 border-blue-900">
					<Table>
						<TableHeader className="h-20">
							{
								table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}  className="hover:bg-blue-950">
										{
											headerGroup.headers.map((header) => {
												return (
													<TableHead key={header.id} className="text-neutral-400">
														{
															header.isPlaceholder
																? null
																: flexRender(
																	header.column.columnDef.header,
																	header.getContext()
																)
														}
													</TableHead>
												)
											})
										}
									</TableRow>
								))
							}
						</TableHeader>
						<TableBody>
							{
								table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-blue-900 border-2 border-blue-900" >
											{
												row.getVisibleCells().map((cell) => (
													<TableCell key={cell.id} className="text-blue-100">
														{
															flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)
														}
													</TableCell>
												))
											}
										</TableRow>
									)
									)
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center text-blue-100">No results.</TableCell>
									</TableRow>
								)
							}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					{/* <div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div> */}
					<div className="space-x-2">
						<Button className="bg-blue-200" variant="outline" size="lg" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
						<Button className="bg-blue-200" variant="outline" size="lg" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
					</div>
				</div>
			</div>
			<CustomBarChart listOfData={sugarsDisplayed || []} date={date || ''} />
		</>
	)
}
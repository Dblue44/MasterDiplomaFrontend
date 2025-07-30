"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon, ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import {Button} from "@shared/ui/button"
import {Input} from "@shared/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table"
import { Tabs, TabsContent } from "@shared/ui/tabs"
import {Label} from "@shared/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@shared/ui/select.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {columns} from "@shared/ui/imageTable";
import {ImageType} from "@shared/api/image";

export function ImageTable({data: initialData}: {data: ImageType[] }) {
  const [data] = React.useState(() => initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => {
      const updated = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]

      table.getColumn("status")?.setFilterValue(
        updated.length ? updated : undefined
      )

      return updated
    })
  }

  return (
    <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6 border rounded-lg">
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto p-4 lg:px-6">
        <div className="flex items-center justify-between py-2">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mr-4"
          />
          <div className="flex items-center gap-2">
            {/*<Select*/}
            {/*  onValueChange={(value) => {*/}
            {/*    if (value === "all") {*/}
            {/*      table.getColumn("status")?.setFilterValue(undefined) // сбрасываем фильтр*/}
            {/*    } else {*/}
            {/*      table.getColumn("status")?.setFilterValue(value)*/}
            {/*    }*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <SelectTrigger className="w-[150px]" id="filter-status">*/}
            {/*    <SelectValue placeholder="Status" />*/}
            {/*  </SelectTrigger>*/}
            {/*  <SelectContent>*/}
            {/*    <SelectItem key="all" value="all">All</SelectItem>*/}
            {/*    <SelectItem key="completed" value="completed">Completed</SelectItem>*/}
            {/*    <SelectItem key="queued" value="queued">Queued</SelectItem>*/}
            {/*    <SelectItem key="working" value="working">Working</SelectItem>*/}
            {/*  </SelectContent>*/}
            {/*</Select>*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[130px]">
                  Filter Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["completed", "queued", "working"].map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                  >
                    {status.toUpperCase()}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground  mr-25 lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize}/>
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon/>
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon/>
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon/>
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon/>
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}


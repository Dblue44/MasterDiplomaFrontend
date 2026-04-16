import {ColumnDef} from "@tanstack/react-table";
import {TableCellViewer} from "@shared/ui/imageTable";
import {Checkbox} from "@shared/ui/checkbox.tsx";
import {Badge} from "@shared/ui/badge.tsx";
import * as React from "react";
import {Ban, CheckCircle2Icon, ListOrderedIcon, LoaderIcon} from "lucide-react";
import {ImageType} from "@shared/api/image";
import {ImageActionsCell} from "@shared/ui/imageTable/imageActionsCell.tsx";
import {ImageTableMeta} from "@shared/ui/imageTable/types.ts";
import {TextShimmer} from "@shared/ui/textShimmer.tsx";
import {ImageTableActions} from "@shared/ui/imageTable/imageTableActions.tsx";

export const columns: ColumnDef<ImageType>[] = [
  {
    id: "select",
    header: ({table}) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "File name",
    cell: ({row}) => {
      return <TableCellViewer item={row.original}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "upscale",
    header: "Upscale",

    cell: ({row}) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.upscale}
      </Badge>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true
      return filterValue.includes(row.getValue(columnId))
    },
    cell: ({row}) => {
      const status = row.original.status
      const iconMap: Record<string, React.ReactNode> = {
        completed: <CheckCircle2Icon className="text-green-500 dark:text-green-400 size-4" />,
        running: <LoaderIcon className="animate-spin text-blue-500 size-4" />,
        queued: <ListOrderedIcon className="text-yellow-500 size-4" />,
        failed: <Ban className="text-red-500 size-4" />,
        cancelled: <Ban className="text-yellow-500 size-4" />,
      }

      return (
        <Badge variant="outline" className="flex items-center gap-1 px-1.5 text-muted-foreground">
          {iconMap[status]}
          {status === "running" ? <TextShimmer>{status}</TextShimmer> : status}
        </Badge>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "processTime",
    header: "Process time",
    cell: ({row}) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.processTime}
      </Badge>
    ),
    enableHiding: true,
  },
  {
    id: "actions",
    header: ({table}) => (
      <ImageTableActions
        selectedRows={table.getFilteredSelectedRowModel().rows.map(r => r.original)}
        isAnySelected={table.getFilteredSelectedRowModel().rows.length > 0}
        onCancelMany={(table.options.meta as ImageTableMeta)?.onCancelMany}
        onSaveMany={(table.options.meta as ImageTableMeta)?.onSaveMany}
        onDeleteMany={(table.options.meta as ImageTableMeta)?.onDeleteMany}
      />
    ),
    cell: ({row, table}) => <ImageActionsCell
      guid={row.original.guid}
      status={row.original.status}
      onEdit={(table.options.meta as ImageTableMeta)?.onEdit}
      onCancel={(table.options.meta as ImageTableMeta)?.onCancel}
      onSave={(table.options.meta as ImageTableMeta)?.onSave}
      onDelete={(table.options.meta as ImageTableMeta)?.onDelete}
    />,
    enableSorting: false,
    enableHiding: false,
  },
]

import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {ImageTableActionsProps} from "@shared/ui/imageTable/types.ts";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdownMenu.tsx";
import {useState} from "react";
import {Ban, Download, EllipsisVertical, LoaderIcon, Trash2} from "lucide-react";
import {Button} from "@shared/ui/button.tsx";

export function ImageTableActions({selectedRows, onSaveMany, onCancelMany, onDeleteMany, isAnySelected}: ImageTableActionsProps) {
  const [loading, setLoading] = useState(false);
  const canDownload = selectedRows.every(el => el.status === "completed");
  const canCancel = selectedRows.every(el => el.status === "queued" || el.status === "running");
  const canDelete = selectedRows.every(el => (
    el.status === "completed" ||
    el.status === "cancelled" ||
    el.status === "failed"
  ));
  const hasAvailableActions = canDownload || canCancel || canDelete;

  const handleDownload = () => {
    setLoading(true);
    onSaveMany();
    setLoading(false);
  };

  const handleCancel = () => {
    setLoading(true);
    onCancelMany();
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    onDeleteMany();
    setLoading(false);
  };

  if (!isAnySelected || !hasAvailableActions) {
    return <></>
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {loading
            ?
            <div className="flex items-center justify-center size-[31px] ml-auto mr-4">
              <LoaderIcon className="animate-spin text-blue-500 w-5 h-5"/>
            </div>
            :
            <Button
              variant="default"
              className="flex size-8 ml-auto mr-4"
              size="icon"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <EllipsisVertical/>
              <span className="sr-only">Открыть меню</span>
            </Button>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40"
        >
          {canDownload ?
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="flex items-center gap-2"
              >
                <Download className="size-4"/>
                Скачать
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
            </> : <></>
          }
          {canCancel ?
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="flex items-center gap-2"
              >
                <Ban className="size-4"/>
                Отменить
              </DropdownMenuItem>
            </> : <></>
          }
          {canDelete ?
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-destructive focus:text-destructive flex items-center gap-2"
            >
              <Trash2 className="size-4"/>
              Удалить
            </DropdownMenuItem> : <></>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {ImageTableActionsProps} from "@shared/ui/imageTable/types.ts";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdownMenu.tsx";
import {useState} from "react";
import {Download, EllipsisVertical, LoaderIcon, Pencil, Trash2} from "lucide-react";
import {Button} from "@shared/ui/button.tsx";

export function ImageTableActions({selectedRows, onSaveMany, onCancelMany, onDeleteMany, isAnySelected}: ImageTableActionsProps) {
  const [loading, setLoading] = useState(false);
  const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(true);
  const [isAnyTakRunning, setIsAnyTakRunning] = useState(false);

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

  if (!isAnySelected) {
    return <></>
  }

  if (selectedRows.find(el => el.status !== "completed")) {
    setIsAllTasksCompleted(false);
  }

  if (selectedRows.find(el => el.status === "running")) {
    setIsAnyTakRunning(true);
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
          {isAllTasksCompleted ?
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
          {isAnyTakRunning ?
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="flex items-center gap-2"
              >
                <Pencil className="size-4"/>
                Отменить
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
            </> : <></>
          }
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-destructive focus:text-destructive flex items-center gap-2"
          >
            <Trash2 className="size-4"/>
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
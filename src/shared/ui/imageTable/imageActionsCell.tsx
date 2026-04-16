import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {ImageActionsCellProps} from "@shared/ui/imageTable/types.ts";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdownMenu.tsx";
import {useState} from "react";
import {Download, EllipsisVertical, LoaderIcon, ScanSearch, Trash2} from "lucide-react";
import {Button} from "@shared/ui/button.tsx";

export function ImageActionsCell({guid, status, onEdit, onSave, onDelete, onCancel}: ImageActionsCellProps) {
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    onEdit?.(guid);
  };

  const handleSave = () => {
    onSave?.(guid);
  };

  const handleDelete = () => {
    setLoading(true);
    onDelete?.(guid);
    setLoading(false);
  };

  const handleCancel = () => {
    setLoading(true);
    onCancel?.(guid);
    setLoading(false);
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
          {status === "completed" ?
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="flex items-center gap-2"
              >
                <Download className="size-4"/>
                Скачать
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                className="flex items-center gap-2"
              >
                <ScanSearch className="size-4"/>
                Предпросмотр
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive flex items-center gap-2"
              >
                <Trash2 className="size-4"/>
                Удалить
              </DropdownMenuItem>
            </>
          : status === "cancelled" ? <>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive flex items-center gap-2"
              >
                <Trash2 className="size-4"/>
                Удалить
              </DropdownMenuItem>
            </> : <>
              <DropdownMenuItem
                onClick={handleCancel}
                className="text-destructive focus:text-destructive flex items-center gap-2"
              >
                <Trash2 className="size-4"/>
                Отменить
              </DropdownMenuItem>
            </>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
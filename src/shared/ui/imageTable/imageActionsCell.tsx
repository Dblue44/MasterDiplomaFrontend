import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {ImageActionsCellProps} from "@shared/ui/imageTable/types.ts";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdownMenu.tsx";
import {useState} from "react";
import {Download, EllipsisVertical, LoaderIcon, Pencil, Trash2} from "lucide-react";
import {Button} from "@shared/ui/button.tsx";

export function ImageActionsCell({guid, completed, onEdit, onSave}: ImageActionsCellProps) {
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    onEdit?.(guid);
  };

  const handleSave = () => {
    onSave?.(guid);
  };

  const onDelete = async () => {
    setDeleting(true)
    setTimeout(() => {
      setDeleting(false)
    }, 1200)

  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {deleting
            ?
            <div className="flex items-center justify-center size-[31px] ml-auto mr-4">
              <LoaderIcon className="animate-spin text-blue-500 w-5 h-5"/>
            </div>
            :
            <Button
              variant="default"
              className="bg-muted data-[state=open]:bg-muted text-muted-foreground flex size-8 ml-auto mr-4"
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
          {completed ?
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
                <Pencil className="size-4"/>
                Изменить
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
            </>
          : <></>}
          <DropdownMenuItem
            onClick={onDelete}
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
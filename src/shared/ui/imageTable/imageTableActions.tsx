import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {ImageTableActionsProps} from "@shared/ui/imageTable/types.ts";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdownMenu.tsx";
import {useState} from "react";
import {Download, EllipsisVertical, LoaderIcon, Pencil} from "lucide-react";
import {Button} from "@shared/ui/button.tsx";

export function ImageTableActions({onSave, onCancel, isAnySelected}: ImageTableActionsProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDownload = () => {
    onSave();
  };

  const handleCancel = () => {
    setDeleting(true)
    setTimeout(() => {
      setDeleting(false)
    }, 1200)
    onCancel();
  };

  if (!isAnySelected) {
    return <></>
  }

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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
import {ImageType} from "@shared/api/image";

export function TableCellViewer({item}: { item: ImageType }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium leading-none">{item.name}</div>
    </div>
  )
}

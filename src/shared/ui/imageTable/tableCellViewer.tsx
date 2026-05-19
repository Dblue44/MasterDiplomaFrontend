import {ImageType} from "@shared/api/image";

export function TableCellViewer({item}: { item: ImageType }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className="max-w-[220px] truncate text-sm font-medium leading-none sm:max-w-[320px]"
        title={item.name}
        style={{fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
      >
        {item.name}
      </div>
    </div>
  )
}

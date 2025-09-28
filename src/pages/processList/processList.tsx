import {ImageTable} from "@shared/ui/imageTable";
import {useAppSelector} from "@shared/lib";
import {selectImageListImages} from "@entities/image/imageList";
import {Toaster} from "@shared/ui/sonner.tsx";

export const ProcessList = () => {
  const data = useAppSelector(selectImageListImages);
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex items-center gap-6 rounded-md p-4">
        <ImageTable data={data}/>
      </div>
    </>
  )
}
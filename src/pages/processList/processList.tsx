import {ImageTable} from "@shared/ui/imageTable";
import {useAppSelector} from "@shared/lib";
import {selectImageListImages} from "@entities/image/imageList";

export const ProcessList = () => {
  const data = useAppSelector(selectImageListImages);
  return (
    <>
      <div className="flex items-center gap-6 rounded-md p-4">
        <ImageTable data={data}/>
      </div>
    </>
  )
}
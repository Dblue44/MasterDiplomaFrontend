import {ImageTable} from "@shared/ui/imageTable";
import {useAppSelector, useAppDispatch} from "@shared/lib";
import {getTasks, selectImageListImages, selectImageListImagesGuid} from "@entities/image/imageList";
import {Toaster} from "@shared/ui/sonner.tsx";
import {useNavigate} from "react-router-dom";
import {ImageUpload} from "@widgets/imageUpload";
import {useEffect, useRef} from "react";

export const ProcessList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectImageListImages);
  const guids = useAppSelector(selectImageListImagesGuid);

  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (hasSyncedRef.current) return;
    if (!guids.length) return;

    hasSyncedRef.current = true;
    dispatch(getTasks({guids}));
  }, [dispatch, guids]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex-wrap">
        <ImageUpload
          onUploadSuccess={() => {
            navigate("/images");
          }}
        />
        <div className="flex items-center gap-6 rounded-md p-4">
          <ImageTable data={data}/>
        </div>
      </div>
    </>
  )
}
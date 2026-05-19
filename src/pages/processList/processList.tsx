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
      <section className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-4 px-4 py-6">
        <ImageUpload
          onUploadSuccess={() => {
            navigate("/images");
          }}
        />
        <div className="w-full min-w-0" style={{fontFamily: "Manrope, sans-serif"}}>
          <ImageTable data={data}/>
        </div>
      </section>
    </>
  )
}

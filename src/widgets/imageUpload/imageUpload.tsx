import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '@shared/lib';
import {postImage} from '@entities/image/imageList';
import {AlertCircleIcon, LoaderIcon} from 'lucide-react';
import {RejectedDataType} from "@shared/types";
import {ImageUploadProps} from "@widgets/imageUpload/types.ts";
import {toast} from "sonner";
import {InteractiveHoverButton} from "@shared/ui/interactiveHoverButton.tsx";

export const ImageUpload: React.FC<ImageUploadProps> = ({
     onUploadSuccess,
     onUploadError,
   }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const loading = useAppSelector((state: RootState) => state.image.loading);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    try {
      const result = await dispatch(postImage({ file }));
      if (postImage.rejected.match(result)) {
        toast.error("Ошибка при отправке фотографии", {
          icon: <AlertCircleIcon />,
          richColors: true,
          description: result.payload?.messageError || "Не удалось отправить фотографию",
        });
        return
      }
      onUploadSuccess?.();
    } catch (err) {
      const result = err as RejectedDataType;
      onUploadError?.(result.messageError ?? 'Неизвестная ошибка');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 rounded-md p-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {loading ? (
          <LoaderIcon className="animate-spin text-blue-500 w-5 h-5"/>
        ) : (
          <InteractiveHoverButton onClick={handleButtonClick}>Загрузить фото</InteractiveHoverButton>
        )}
      </div>
    </>
  );
};

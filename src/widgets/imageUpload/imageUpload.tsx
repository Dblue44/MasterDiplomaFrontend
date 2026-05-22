import React, {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@shared/lib';
import {clearError, postImage} from '@entities/image/imageList';
import {AlertCircleIcon, LoaderIcon} from 'lucide-react';
import {RejectedDataType} from "@shared/types";
import {ImageUploadProps} from "@widgets/imageUpload/types.ts";
import {toast} from "sonner";
import {InteractiveHoverButton} from "@shared/ui/interactiveHoverButton.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@shared/ui/dialog.tsx";
import {Button} from "@shared/ui/button.tsx";

const MAX_IMAGE_WIDTH = 1080;
const MAX_IMAGE_HEIGHT = 920;
const IMAGE_SIZE_ERROR_MESSAGE = "Фотография не должна превышать размера 1080x920 пикселей";
const IMAGE_SIZE_ERROR_MESSAGE_VERTICAL = "Фотография не должна превышать размера 920x1080 пикселей";

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => (
  new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Failed to load image"));
    };

    image.src = imageUrl;
  })
);

export const ImageUpload: React.FC<ImageUploadProps> = ({
     onUploadSuccess,
     onUploadError,
  }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selectedFileRef = useRef<File | null>(null);
  const [isScaleDialogOpen, setIsScaleDialogOpen] = useState(false);
  const loading = useAppSelector((state: RootState) => state.image.loading);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    let dimensions: { width: number; height: number };

    try {
      dimensions = await getImageDimensions(file);
    } catch {
      toast.error("Не удалось прочитать фотографию", {
        icon: <AlertCircleIcon />,
        richColors: true,
      });
      resetSelectedFile();
      return;
    }

    if (dimensions.width >= dimensions.height) {
      if (dimensions.width > MAX_IMAGE_WIDTH || dimensions.height > MAX_IMAGE_HEIGHT) {
        toast.error(IMAGE_SIZE_ERROR_MESSAGE, {
          icon: <AlertCircleIcon />,
          richColors: true,
        });
        resetSelectedFile();
        return;
      }
    } else {
      if (dimensions.height > MAX_IMAGE_WIDTH || dimensions.width > MAX_IMAGE_HEIGHT) {
        toast.error(IMAGE_SIZE_ERROR_MESSAGE_VERTICAL, {
          icon: <AlertCircleIcon />,
          richColors: true,
        });
        resetSelectedFile();
        return;
      }
    }



    selectedFileRef.current = file;
    setIsScaleDialogOpen(true);
  };

  const resetSelectedFile = () => {
    selectedFileRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleScaleSelect = async (scale: "2" | "4") => {
    if (!selectedFileRef.current) return;

    setIsScaleDialogOpen(false);
    try {
      const result = await dispatch(postImage({ file: selectedFileRef.current, scale }));
      if (postImage.rejected.match(result)) {
        toast.error("Ошибка при отправке фотографии", {
          icon: <AlertCircleIcon />,
          richColors: true,
          description: result.payload?.messageError || "Не удалось отправить фотографию",
        });
        dispatch(clearError());
        return
      }
      onUploadSuccess?.();
    } catch (err) {
      const result = err as RejectedDataType;
      onUploadError?.(result.messageError ?? 'Неизвестная ошибка');
    } finally {
      resetSelectedFile();
    }
  };

  const handleScaleDialogOpenChange = (open: boolean) => {
    setIsScaleDialogOpen(open);
    if (!open) {
      resetSelectedFile();
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
          <LoaderIcon className="animate-spin text-blue-500 size-5"/>
        ) : (
          <InteractiveHoverButton
            onClick={handleButtonClick}
            style={{fontFamily: "Manrope, sans-serif"}}
          >
            Загрузить фото
          </InteractiveHoverButton>
        )}
      </div>
      <Dialog open={isScaleDialogOpen} onOpenChange={handleScaleDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{fontFamily: "Manrope, sans-serif"}}>Выберите масштаб</DialogTitle>
            <DialogDescription style={{fontFamily: "Manrope, sans-serif"}}>
              Фотография будет отправлена на обработку после выбора масштаба.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="items-center justify-center sm:justify-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="min-w-32"
              onClick={() => handleScaleSelect("2")}
              disabled={loading}
              style={{fontFamily: "Manrope, sans-serif"}}
            >
              x2
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="min-w-32"
              onClick={() => handleScaleSelect("4")}
              disabled={loading}
              style={{fontFamily: "Manrope, sans-serif"}}
            >
              x4
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

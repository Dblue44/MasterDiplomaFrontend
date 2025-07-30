import React, {useRef, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@shared/lib';
import {clearError, postImage} from '@entities/image/imageList';
import {LoaderIcon, UploadCloud} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@shared/ui/dialog';
import {Button} from '@shared/ui/button';
import {RejectedDataType} from "@shared/types";

interface ImageUploadWidgetProps {
  onUploadSuccess?: () => void;
  onUploadError?: (error: string) => void;
}

export const ImageUploadWidget: React.FC<ImageUploadWidgetProps> = ({
     onUploadSuccess,
     onUploadError,
   }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const errorMessage = useAppSelector((state: RootState) => state.image.error);
  const loading = useAppSelector((state: RootState) => state.image.loading);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    try {
      await dispatch(postImage({ file })).unwrap();
      onUploadSuccess?.();
    } catch (err: unknown) {
      const result = err as RejectedDataType;
      onUploadError?.(result.messageError ?? 'Unknown error');
    } finally {
      e.target.value = '';
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    dispatch(clearError());
  };

  useEffect(() => {
    if (errorMessage) {
      setIsDialogOpen(true);
    }
  }, [errorMessage]);

  return (
    <>
      <div ref={containerRef} className="flex items-center gap-6 rounded-md p-4">
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
          <Button onClick={handleButtonClick} className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5"/>
            <span>Загрузить фото</span>
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent showCloseButton={false} portalContainer={containerRef.current}>
          <DialogHeader>
            <DialogTitle>Ошибка загрузки</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" onClick={handleDialogClose}>
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

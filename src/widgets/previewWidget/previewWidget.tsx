import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import type { HoverState, LoadedImages, PreviewImageProps } from "./types";
import { FloatingZoom } from "./floatingZoom";
import { getPreviewImages } from "@entities/image/imageList";
import { useAppDispatch, useAppSelector } from "@shared/lib";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const PreviewImage = React.memo(function PreviewImage({
  src,
  alt,
  hover,
  onPointerMove,
  onPointerLeave,
  zoom = 3,
  paneSizePx = 220,
}: PreviewImageProps) {
  const lensPx = Math.round(paneSizePx / zoom);

  const lensStyle: React.CSSProperties | undefined = hover.active
    ? {
      width: lensPx,
      height: lensPx,
      left: `${hover.lensXPct * 100}%`,
      top: `${hover.lensYPct * 100}%`,
    }
    : undefined;

  return (
    <div className="relative overflow-hidden rounded-lg border bg-muted/30">
      {hover.active && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2
               rounded-full
               border-5 border-white
               shadow-[0_0_0_2px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.6)]
               bg-transparent"
          style={lensStyle}
        />
      )}

      <img
        src={src}
        alt={alt}
        className="h-auto w-full select-none object-contain"
        loading="eager"
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerMove}
        onPointerLeave={onPointerLeave}
      />
    </div>
  );
});

export const PreviewWidget = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { guid } = useParams<{ guid: string }>();

  const previewLoading = useAppSelector((s) => s.image.previewLoading);
  const previewError = useAppSelector((s) => s.image.previewError);

  const [images, setImages] = React.useState<LoadedImages | null>(null);

  // ====== Settings ======
  const ZOOM = 30;
  const PANE_SIZE_PX = 180;

  const LENS_SIZE_PX = Math.round(PANE_SIZE_PX / Math.max(1, ZOOM));

  const [hover, setHover] = React.useState<HoverState>({ active: false });

  const onBack = React.useCallback(() => navigate("/images"), [navigate]);

  React.useEffect(() => {
    if (!guid) return;

    let alive = true;

    const run = async () => {
      setImages(null);

      try {
        const response = (await dispatch(getPreviewImages({ guid })).unwrap());
        if (!alive) return;

        setImages({
          originalUrl: response.urlOriginal,
          resultUrl: response.urlResult,
        });
      } catch (e) {
        console.error("Preview load failed:", e);
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, [guid, dispatch]);

  const onPointerLeave = React.useCallback(() => {
    setHover({ active: false });
  }, []);

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLImageElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 1) Для увеличения — сырые координаты (чтобы у края реально было 0%/100%)
      const zoomXPct = clamp01(x / rect.width);
      const zoomYPct = clamp01(y / rect.height);

      // 2) Для линзы — клампим центр, чтобы круг не вылезал за img
      const half = LENS_SIZE_PX / 2;
      const clampedX = Math.min(rect.width - half, Math.max(half, x));
      const clampedY = Math.min(rect.height - half, Math.max(half, y));

      const lensXPct = clamp01(clampedX / rect.width);
      const lensYPct = clamp01(clampedY / rect.height);

      setHover({
        active: true,
        lensXPct,
        lensYPct,
        zoomXPct,
        zoomYPct,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    },
    [LENS_SIZE_PX]
  );

  const isLoading = previewLoading || !images;

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>

          <div className="flex flex-col">
            <div className="text-sm text-muted-foreground">Предпросмотр</div>
            <div className="font-semibold">{guid ? `Задача: ${guid}` : "Задача"}</div>
          </div>
        </div>

        {previewLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Загружаю изображения...
          </div>
        )}
      </div>

      {previewError && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <div className="mb-1 font-medium">Ошибка</div>
          <div>{previewError}</div>
        </div>
      )}

      {images && (
        <FloatingZoom
          active={hover.active}
          clientX={hover.active ? hover.clientX : 0}
          clientY={hover.active ? hover.clientY : 0}
          xPct={hover.active ? hover.zoomXPct : 0.5}
          yPct={hover.active ? hover.zoomYPct : 0.5}
          originalSrc={images.originalUrl}
          resultSrc={images.resultUrl}
          zoom={ZOOM}
          paneSizePx={250}
        />
      )}

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-2">
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">Исходное изображение</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              original
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-[360px] w-full rounded-lg" />
              </>
            ) : (
              <PreviewImage
                src={images!.originalUrl}
                alt="original"
                hover={hover}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                zoom={ZOOM}
                paneSizePx={PANE_SIZE_PX}
              />
            )}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">Итоговое изображение</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              result
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-[360px] w-full rounded-lg" />
              </>
            ) : (
              <PreviewImage
                src={images!.resultUrl}
                alt="result"
                hover={hover}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                zoom={ZOOM}
                paneSizePx={PANE_SIZE_PX}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
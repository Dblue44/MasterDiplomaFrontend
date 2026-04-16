import type * as React from "react";
import { z } from "zod";

/**
 * Две ссылки на изображения (исходное + итоговое), которые показываются на странице предпросмотра.
 */
export const LoadedImagesSchema = z.object({
  originalUrl: z.string().min(1),
  resultUrl: z.string().min(1),
});

export type LoadedImages = z.infer<typeof LoadedImagesSchema>;

/**
 * Состояние ховера по картинке.
 * xPct/yPct — позиция курсора в долях [0..1] относительно видимой области img.
 */
export type HoverState =
  | {
  active: true;
  // Для линзы (кламп с учётом размера линзы)
  lensXPct: number;
  lensYPct: number;

  // Для окна увеличения (сырые координаты курсора)
  zoomXPct: number;
  zoomYPct: number;

  clientX: number;
  clientY: number;
}
  | { active: false };

export const HoverStateSchema = z.discriminatedUnion("active", [
  z.object({
    active: z.literal(true),
    xPct: z.number().min(0).max(1),
    yPct: z.number().min(0).max(1),
    clientX: z.number(),
    clientY: z.number(),
  }),
  z.object({
    active: z.literal(false),
  }),
]);

/**
 * Пропсы линзы увеличения (плавающее окно рядом с курсором).
 */
export type FloatingZoomProps = {
  active: boolean;
  clientX: number;
  clientY: number;
  xPct: number;
  yPct: number;
  originalSrc: string;
  resultSrc: string;
  /** 1 = без увеличения (crop), >1 = увеличение */
  zoom?: number;
  /** Размер каждого окна увеличения (в px) */
  paneSizePx?: number;
  /** Промежуток между двумя окнами */
  gapPx?: number;
};

/**
 * Пропсы компонента отображения картинки с рамкой линзы.
 */
export type PreviewImageProps = {
  src: string;
  alt: string;
  hover: HoverState;
  onPointerMove: (e: React.PointerEvent<HTMLImageElement>) => void;
  onPointerLeave: () => void;
  zoom?: number;
  paneSizePx?: number;
};
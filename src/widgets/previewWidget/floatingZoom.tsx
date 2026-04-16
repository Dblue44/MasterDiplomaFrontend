import * as React from "react";
import type { FloatingZoomProps } from "./types";

export const FloatingZoom = React.memo(function FloatingZoom({
  active,
  clientX,
  clientY,
  xPct,
  yPct,
  originalSrc,
  resultSrc,
  zoom = 1,
  paneSizePx = 180,
  gapPx = 20,
}: FloatingZoomProps) {
  if (!active) return null;

  const viewportW = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 0;

  const offset = 15;
  const totalWidth = paneSizePx * 2 + gapPx;

  const left =
    clientX + offset + totalWidth > viewportW
      ? clientX - offset - totalWidth
      : clientX + offset;

  const top =
    clientY + offset + paneSizePx > viewportH
      ? clientY - offset - paneSizePx
      : clientY + offset;

  const Pane = (src: string, label: string) => (
    <div className="flex flex-col gap-1">
      <div className="text-[20px] text-muted-foreground">{label}</div>
      <div
        className="overflow-hidden rounded-md border bg-muted/30 shadow-sm"
        style={{
          width: paneSizePx,
          height: paneSizePx,
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
          backgroundPosition: `${xPct * 100}% ${yPct * 100}%`,
        }}
      />
    </div>
  );

  return (
    <div className="pointer-events-none z-50" style={{ position: "fixed", left, top }}>
      <div className="flex items-start gap-2 rounded-lg border bg-background/80 p-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {Pane(originalSrc, "Оригинал")}
        <div style={{ width: gapPx }} />
        {Pane(resultSrc, "Результат")}
      </div>
    </div>
  );
});
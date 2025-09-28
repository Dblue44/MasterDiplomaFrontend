import React, {useState, useRef, useCallback} from "react";
import {ChevronsLeftRight} from "lucide-react";
import {BeforeAfterSliderProps} from "@widgets/beforeAfterSlider/types.ts";


export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  className="w-50",
  width="w-full",
  height="h-auto",
}: BeforeAfterSliderProps)  {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      let pct = (x / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      setPosition(pct);
    }, [dragging]
  );

  const clipPath = `polygon(${position}% 0%, 100% 0%, 100% 100%, ${position}% 100%)`;

  return (
    <div
      ref={containerRef}
      className={`${className} ${width} ${height} relative overflow-hidden rounded-xl select-none touch-none`}
      onPointerMove={onPointerMove}
    >
      <img
        src={beforeSrc}
        alt="Before"
        className="block w-full h-auto object-cover"
      />

      <div
        className="absolute inset-0"
        style={{ clipPath, WebkitClipPath: clipPath }}
      >
        <img
          src={afterSrc}
          alt="After"
          className="block w-full h-auto object-cover"
        />
      </div>

      <div
        className="ba-handle absolute top-0 bottom-0 w-px bg-white cursor-ew-resize"
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="w-5 h-5 bg-amber-50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <ChevronsLeftRight className="text-black" size={18} />
        </div>
      </div>
    </div>
  );
}

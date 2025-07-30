import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button } from '@shared/ui/button';

interface PhotoEditorWidgetProps {
  imageSrc: string;
}

export const PhotoEditorWidget: React.FC<PhotoEditorWidgetProps> = ({ imageSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="mb-4 space-x-2">
              <Button onClick={() => zoomIn()}>+ Zoom</Button>
              <Button onClick={() => zoomOut()}>– Zoom</Button>
              <Button onClick={() => resetTransform()}>Reset</Button>
            </div>
            <div className="border overflow-hidden">
              <TransformComponent>
                <img
                  src={imageSrc}
                  alt="To edit"
                  className="block max-w-full max-h-[80vh] select-none"
                  draggable={false}
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

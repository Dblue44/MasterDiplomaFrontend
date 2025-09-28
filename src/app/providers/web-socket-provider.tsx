import {FC, JSX, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import { updateImageStatus } from "@entities/image/imageList";
import {selectImageListImagesGuid} from "@entities/image/imageList";
import { getSocket } from "@shared/lib/socket";
import {CONFIG} from "@/config";
import {UpdateImageStatusType} from "@shared/api/image/types.ts";

export const WebSocketProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const guids = useAppSelector(selectImageListImagesGuid);

  useEffect(() => {
    const ws = getSocket();

    // Обработчики
    const handleOpen = () => {
      console.log("[WS] Connected to", CONFIG.WS_URL);
      ws.send(JSON.stringify({ type: "subscribe", guids }));
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as {
          guid: string;
          status: string;
          error?: string;
        };
        dispatch(updateImageStatus(data as UpdateImageStatusType));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[WS] Invalid message:", event.data, "—", msg);
      }
    };

    const handleError = (err: Event) => {
      console.error("[WS] Error", err);
    };

    const handleClose = (evt: CloseEvent) => {
      console.log("[WS] Closed", evt.code, evt.reason);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", handleError);
    ws.addEventListener("close", handleClose);

    if (ws.readyState === WebSocket.OPEN) {
      handleOpen();
    }

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("error", handleError);
      ws.removeEventListener("close", handleClose);
    };
  }, [dispatch, guids]);

  return <>{children}</>;
};

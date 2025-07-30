import {FC, JSX, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@shared/lib"; // ваш хук для dispatch
import { updateImageStatus } from "@entities/image/imageList";
import {selectImageListImagesGuid} from "@entities/image/imageList";
import { getSocket } from "@shared/lib/socket";
import {CONFIG} from "@/config";

export const WebSocketProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const guids = useAppSelector(selectImageListImagesGuid);

  useEffect(() => {
    const ws = getSocket();

    ws.onopen = () => {
      console.log("[WS] Connected to", CONFIG.WS_URL);
      ws.send(JSON.stringify({ type: "subscribe", guids: guids }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as {
          guid: string;
          status: string;
          error?: string;
        };
        dispatch(updateImageStatus(data));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("[WS] Invalid message:", event.data, "—", error.message);
        } else {
          console.error("[WS] Invalid message:", event.data, "—", String(error));
        }
      }
    };

    ws.onerror = (err) => {
      console.error("[WS] Error", err);
    };

    ws.onclose = (evt) => {
      console.log("[WS] Closed", evt.code, evt.reason);
    };
  }, [dispatch]);

  useEffect(() => {
    const ws = getSocket();
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "subscribe", guids: guids }));
    }
  }, [guids]);

  return <>{children}</>;
};

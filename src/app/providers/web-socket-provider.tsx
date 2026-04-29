import {FC, JSX, useCallback, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import { updateImageStatus } from "@entities/image/imageList";
import {selectImageListImagesGuid} from "@entities/image/imageList";
import { getSocket } from "@shared/lib/socket";
import {UpdateImageStatusType} from "@shared/api/image/types.ts";
import {SubscribePayload} from "./types.ts";

const sig = (guids: string[]) => [...guids].sort().join("|");

export const WebSocketProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const guids = useAppSelector(selectImageListImagesGuid);

  const wsRef = useRef<WebSocket | null>(null);
  const guidsRef = useRef<string[]>(guids ?? []);
  const lastSigRef = useRef<string>("");

  const sendSubscribe = useCallback(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    const nextSig = sig(guidsRef.current);
    if (nextSig === lastSigRef.current) return;

    lastSigRef.current = nextSig;
    const payload: SubscribePayload = { type: "subscribe", guids: guidsRef.current };
    ws.send(JSON.stringify(payload));
  }, []);

  useEffect(() => {
    guidsRef.current = guids ?? [];
    sendSubscribe();
  }, [guids, sendSubscribe]);

  useEffect(() => {
    const ws = getSocket();
    wsRef.current = ws;

    const onOpen = () => {
      console.log("[WS] Connected to", ws.url);
      sendSubscribe();
    };

    const onMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as UpdateImageStatusType;
        dispatch(updateImageStatus(data));
      } catch (e) {
        console.error("[WS] invalid message", event.data, e);
      }
    };

    const onClose = () => {
      console.log("[WS] Closed", ws.url);
    };

    ws.addEventListener("open", onOpen);
    ws.addEventListener("message", onMessage);
    ws.addEventListener("close", onClose);

    if (ws.readyState === WebSocket.OPEN) {
      sendSubscribe();
    }

    return () => {
      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("message", onMessage);
      ws.removeEventListener("close", onClose);
    };
  }, [dispatch, sendSubscribe]);

  return <>{children}</>;
};

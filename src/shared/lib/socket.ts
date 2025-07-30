import { CONFIG } from "@/config";

let socket: WebSocket | null = null;

export function getSocket(): WebSocket {
  if (!socket) {
    socket = new WebSocket(CONFIG.WS_URL);
    console.log("[socket] created");
  }
  return socket;
}
import { CONFIG } from "@/config";

let socket: WebSocket | null = null;

export function getSocket(): WebSocket {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return socket;
  }

  socket = new WebSocket(CONFIG.WS_URL);
  console.log("[WS] created");

  socket.addEventListener("close", () => {
    if (socket?.readyState === WebSocket.CLOSED) {
      socket = null;
      console.log("[socket] cleared");
    }
  });

  return socket;
}
import { emitAppEvent } from "./appEventHandler";

let defaultHost = "ws://localhost:3001/websockets?botwerk";
let connection;

function connectWebsocket(host) {
  connection = new WebSocket(host);
  connection.onmessage = (pkg) => {
    try {
      const { type, socketIndex, clientId, content } = JSON.parse(
        pkg.data.toString()
      );
      emitAppEvent(type, content, { 
        socketIndex,
        clientId,
      });
    } catch (e) {
      emitAppEvent("LOG", "Error occured on socket message:" + JSON.stringify(pkg));
      emitAppEvent("LOG", e.message);
    }
  };
  emitAppEvent("LOG", "Connected websocket!");
}

function disconnectWebsocket() {
  if (!connection) {
    return;
  }
  connection.close();
  connection = null;
}

function isConnected() {
  if (!connection) {
    return false;
  }
  return true;
}

export { defaultHost, connectWebsocket, disconnectWebsocket, isConnected };

const WebSocket = require("ws");
const { v4: uuidv4 } = require('uuid');
const { emit } = require('./eventHandler');

let connections = {};

async function startWebsocket(server) {
  const ws = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  server.on("upgrade", (request, socket, head) => {
    ws.handleUpgrade(request, socket, head, (websocket) => {
      ws.emit("connection", websocket, request);
    });
  });

  ws.on("connection", (socket, req) => {
    console.log("Incoming connection!");
    const [_path, params] = req?.url?.split("?");
    const socketId = uuidv4();
    const channel = params;
  
    if (!connections[channel]) {
      connections[channel] = {};
    }

    connections[channel][socketId] = socket;
    
    socket.on('message', (pkg) => {
      let {
        type,
        content,
      } = JSON.parse(pkg);

      try {
        content = JSON.parse(content);
      } catch {
        console.log("Package is not json");
      }

      emit('onSocketEvent', {
        type,
        channel,
        content,
        socketId
      });
    });

    socket.on("close", () => {
      emit('onSocketEvent', {
        type: 'SOCKET_DISCONNECTED',
        channel,
        socketId,
      });
      delete connections[channel][socketId];
      if (Object.keys(connections[channel]).length === 0) {
        delete connections[channel];
      }
    });
  });

  return ws;
};

function broadcast(channel, pkg) {
  if (!connections[channel]) {
    return;
  }

  for (const key of Object.keys(connections[channel])) {
    connections[channel][key].send(JSON.stringify(pkg));
  }
}

module.exports = {
  startWebsocket,
  broadcast,
};

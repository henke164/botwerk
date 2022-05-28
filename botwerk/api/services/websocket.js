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
    const id = uuidv4();
    const channel = params;
  
    if (!connections[channel]) {
      connections[channel] = {};
    }

    connections[channel][id] = socket;
    
    socket.on('message', (pkg) => {
      const package = JSON.parse(pkg);
      try {
        package.content = JSON.parse(package.content);
      } catch {
        console.log("Package is not json");
      }

      emit('onClientEvent', package);
    });

    socket.on("close", () => {
      console.log("disconnected!");
      emit('onClientEvent', {
        type: 'SOCKET_DISCONNECTED',
        id,
      });
      delete connections[channel][id];
      if (Object.keys(connections[channel]).length === 0) {
        delete connections[channel];
      }
    });
  });

  ws.on("close", (socket) => {
    console.log('socket closed', socket.id)
  })

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

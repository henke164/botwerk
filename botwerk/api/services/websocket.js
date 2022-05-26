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
      emit('client', JSON.parse(pkg.toString()));
    });

    socket.on("close", () => {
      emit('client', {
        type: 'SOCKET_DISCONNECTED',
        content: id
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

  console.log('PACKAGE', pkg);
  let str = pkg;
  try {
    str = JSON.stringify(pkg);
  } catch (e) {
    console.log('Couldnt parse', str);
  }

  for (const key of Object.keys(connections[channel])) {
    connections[channel][key].send(str);
  }
}

module.exports = {
  startWebsocket,
  broadcast,
};

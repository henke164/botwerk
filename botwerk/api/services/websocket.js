const WebSocket = require("ws");
const { v4: uuidv4 } = require('uuid');
const { emit } = require('./eventHandler');

let botwerkConnections = [];
let clientConnections = {};

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
    const paramsParts = params.split('=');
    const channel = paramsParts[0];
    socket.channel = channel;
    
    if (channel === 'botwerk') {
      botwerkConnections.push(socket);
    } else if (channel === 'client') {
      socket.clientId = paramsParts[1];
      clientConnections[socket.clientId] = socket;
    } else {
      return;
    }
        
    socket.on('message', (pkg) => {
      try {
        let {
          type,
          socketIndex,
          content,
        } = JSON.parse(pkg);
        try {
          content = JSON.parse(content);
        } catch {
          console.log("Package is not json");
        }

        emit('onSocketEvent', {
          type,
          socketIndex,
          channel,
          content,
        });
      } catch(e) {
        console.log('Packet error', pkg.toString());
        console.log('Error', e.message);
      }
    });

    socket.on("close", () => {
      emit('onSocketEvent', {
        type: 'SOCKET_DISCONNECTED',
        channel,
      });

      if (channel === 'botwerk') {
        const index = botwerkConnections.indexOf(socket);
        botwerkConnections.splice(index, 1);
      } else {
        delete clientConnections[socket.clientId];
      }
    });
  });

  return ws;
};

function sendToBotwerk(pkg) {
  for (const socket of botwerkConnections) {
    socket.send(JSON.stringify(pkg));
  }
}

function getClientConnection(clientId) {
  return clientConnections[clientId];
}

module.exports = {
  startWebsocket,
  getClientConnection,
  sendToBotwerk,
};

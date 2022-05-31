var sockets = [];

function modifyWebSocketConstructor() {
  var OrigWebSocket = window.WebSocket;
  var callWebSocket = OrigWebSocket.apply.bind(OrigWebSocket);
  var wsAddListener = OrigWebSocket.prototype.addEventListener;
  wsAddListener = wsAddListener.call.bind(wsAddListener);
  window.WebSocket = function WebSocket(url, protocols) {
    var ws;
    if (!(this instanceof WebSocket)) {
      ws = callWebSocket(this, arguments);
    } else if (arguments.length === 1) {
      ws = new OrigWebSocket(url);
    } else if (arguments.length >= 2) {
      ws = new OrigWebSocket(url, protocols);
    } else {
      ws = new OrigWebSocket();
    }

    wsAddListener(ws, 'message', function(event) {
      window.botwerk.socket.send(JSON.stringify({
        type: "MESSAGE_RECEIVED",
        socketIndex: sockets.indexOf(ws),
        content: event.data,
      }));
    });

    sockets.push(ws);

    window.botwerk.socket.send(JSON.stringify({
      type: "SOCKET_CONNECTED",
      socketIndex: sockets.indexOf(ws),
    }));
    return ws;
  }.bind();

  window.WebSocket.prototype = OrigWebSocket.prototype;
  window.WebSocket.prototype.constructor = window.WebSocket;

  var wsSend = OrigWebSocket.prototype.send;
  wsSend = wsSend.apply.bind(wsSend);
  OrigWebSocket.prototype.send = function (data) {
    try {
      if (this !== window.botwerk.socket) {
        window.botwerk.socket.send(JSON.stringify({
          type: "MESSAGE_SENT",
          socketIndex: sockets.indexOf(this),
          content: data,
        }));
      }
    } catch(e) {
      console.log(e);
    }
    return wsSend(this, [data]);
  };
}

var clientId = document.getElementById('botwerk-clientId').value;
console.log(document.getElementById('botwerk-clientId'));
window.botwerk = {
  socket: new WebSocket("ws://localhost:3001/websockets?client=" + clientId)
}

window.botwerk.socket.onopen = function () {
  window.botwerk.socket.send(JSON.stringify({
    type: "LOG",
    content: "Socket injector connected: " + window.location.href
  }));
}

window.botwerk.socket.onmessage = function (pkg) {
  const { socketIndex, message } = JSON.parse(pkg.data);
  if (!sockets[socketIndex]) {
    return;
  }
  sockets[socketIndex].send(message);
}

modifyWebSocketConstructor();
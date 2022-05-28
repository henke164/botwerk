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
        clientId: botwerk.clientId,
        content: event.data,
      }));
    });

    window.botwerk.socket.send(JSON.stringify({
      type: "SOCKET_CONNECTED",
      clientId: botwerk.clientId,
    }));

    sockets.push(ws);
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
          content: data,
        }));
      }
    } catch(e) {
      console.log(e);
    }
    return wsSend(this, [data]);
  };
}

window.botwerk = {
  clientId: document.getElementById('botwerk-clientId'),
  socket: new WebSocket("ws://localhost:3001/websockets?client")
}

window.botwerk.socket.onopen = function () {
  window.botwerk.socket.send(JSON.stringify({
    type: "LOG",
    content: "Socket injector connected: " + window.location.href
  }));
}

window.botwerk.socket.onmessage = function (message) {
  console.log('message', message);
}

modifyWebSocketConstructor();
function uuid() {
  var u='',i=0;
  while(i++<36) {
    var c='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1],r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
    u+=(c=='-'||c=='4')?c:v.toString(16)
  }
  return u;
}

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

    ws.id = uuid();

    wsAddListener(ws, 'message', function(event) {
      window.botwerkApiSocket.send(JSON.stringify({
        type: "MESSAGE_RECEIVED",
        id: this.id,
        content: event.data,
      }));
    });

    window.botwerkApiSocket.send(JSON.stringify({
      type: "SOCKET_CONNECTED",
      id: ws.id
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
      if (this !== window.botwerkApiSocket) {
        window.botwerkApiSocket.send(JSON.stringify({
          type: "MESSAGE_SENT",
          id: this.id,
          content: data,
        }));
      }
    } catch(e) {
      console.log(e);
    }
    return wsSend(this, [data]);
  };
}

window.botwerkApiSocket = new WebSocket("ws://localhost:3001/websockets?client");

window.botwerkApiSocket.onopen = function () {
  window.botwerkApiSocket.send(JSON.stringify({
    type: "LOG",
    content: "Socket injector connected:" + window.location.href
  }));
}

window.botwerkApiSocket.onmessage = function (message) {
  console.log('message', message);
}

modifyWebSocketConstructor();
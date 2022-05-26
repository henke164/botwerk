const express = require('express');
const { startWebsocket, broadcast } = require('./services/websocket');
const { addEventListener } = require('./services/eventHandler');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send("OK");
});

const server = app.listen(port, () => {
  console.log(`App started: ${port}`);
});

startWebsocket(server);

addEventListener('client', (data) => {
  broadcast('botwerk', data);
});
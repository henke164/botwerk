const express = require('express');
const routes = require(`./routes/index.js`);
const bodyParser = require('body-parser');
const cors = require('cors');

const { startWebsocket, broadcast } = require('./services/websocket');
const { addEventListener } = require('./services/eventHandler');
const { updateObjectDataFromEvent } = require('./services/objectBuilder.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send("OK");
});

const server = app.listen(port, () => {
  console.log(`App started: ${port}`);
});

startWebsocket(server);

addEventListener('onSocketEvent', (data) => {
  if (data.type === 'LOG') {
    console.log(data.content);
  }

  if (data.channel === 'client') {
    broadcast('botwerk', data);
    updateObjectDataFromEvent(data);
  }
});

addEventListener('onObjectCreated', ({ clientId }) => {
  broadcast('botwerk', {
    type: 'OBJECT_CREATED',
    clientId
  });
});

addEventListener('LOG', (data) => {
  console.log("Error log", data);
});

updateObjectDataFromEvent({
  type: 'MESSAGE_RECEIVED',
  channel: 'client',
  content: { t: 'USER_DATA', d: { i: '1337', l: '19', n: 'SuperHero1337' } },
  socketId: 'a6919d0b-f35d-4f16-9c28-60ff160686b8'
});
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
  if (data.channel === 'client') {
    broadcast('botwerk', data);
    updateObjectDataFromEvent(data);
  }
});

updateObjectDataFromEvent({
  type: 'MESSAGE_RECEIVED',
  id: '32255cde-9c04-4c3b-9e15-8c765e23ab38',
  content: { t: 'USER_DATA', d: { i: '1337', l: '19', n: 'SuperHero1337' } }
});
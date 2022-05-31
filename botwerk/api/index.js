const express = require('express');
const routes = require(`./routes/index.js`);
const bodyParser = require('body-parser');
const cors = require('cors');

const { startWebsocket, sendToBotwerk } = require('./services/websocket');
const { addEventListener } = require('./services/eventHandler');
const { updateObjectDataFromEvent } = require('./services/objectBuilder.js');
const { runTimedActions, startActionListener } = require('./services/actionHandler.js');

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
    sendToBotwerk(data);
    if (data.type === 'MESSAGE_RECEIVED') {
      updateObjectDataFromEvent(data);
    }
  }
});

addEventListener('onObjectCreated', ({ clientId }) => {
  sendToBotwerk({
    type: 'OBJECT_CREATED',
    clientId
  });
});

addEventListener('LOG', (content) => {
  sendToBotwerk({
    type: 'LOG',
    content
  });
});

startActionListener();
setInterval(runTimedActions, 1000);
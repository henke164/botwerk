const { WebSocketServer } = require('ws');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

let client;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/request-package', (req, res) => {
  console.log("Sending...", req.body);
  if (client) {
    client.send(JSON.stringify(req.body));
  }
});

app.listen(port, () => {
  console.log(`Test-zone started on port: ${port}`);
});

const wss = new WebSocketServer({ port: 3003 });
wss.on('connection', function connection(ws) {
  client = ws;

  client.on('message', function message(data) {
    console.log('received: %s', data);
  });

  client.send(JSON.stringify({
    t: 'CONNECTION', // Type
    s: true, // Success
  }));
});
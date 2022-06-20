const { emit, addEventListener } = require("./eventHandler");
const { getClientConnection } = require("./websocket");
const { getWorkspace } = require("./workspace/workspaceService");
const started = Date.now();

function log(txt) {
  console.log("Logging", txt);
  emit("LOG", txt);
}

function startActionListener() {
  addEventListener('onSocketEvent', (ev) => {
    const {
      type,
      channel,
      content,
      socketIndex
    } = ev;

    if (type !== 'MESSAGE_RECEIVED' || channel === 'botwerk') {
      return;
    }
    
    const workspace = getWorkspace();
    workspace.actions.forEach(action => {
      var shouldTriggerFromPacket = () => false;

      let shouldRun = false;

      try {
        eval(action.trigger);
        shouldRun = shouldTriggerFromPacket(socketIndex, content);
      } catch (e) {
        console.log(`Error occured in action ${action.id}`, e.message);
        return;
      }

      if (!shouldRun) {
        return;
      }

      var runScript = () => {};
      try {
        eval(action.script);
      } catch (e) {
        console.log(e.message);
        return;
      }

      const clients = workspace.clients.filter(c => c.actions.includes(action.id));
      clients.forEach(client => {
        const socket = getClientConnection(client.id);
        if (!socket) {
          return;
        }

        const sendMessage = (socketIndex, message) => {
          socket.send(JSON.stringify({
            socketIndex,
            message
          }));
        };

        runScript(client.objects, sendMessage);
      });
    });
  });
}

function runTimedActions() {
  const time = Math.floor((Date.now() - started) / 1000);
  const workspace = getWorkspace();

  workspace.actions.forEach(action => {
    var shouldTriggerFromTime = () => false;
    eval(action.trigger);
    
    const shouldRun = shouldTriggerFromTime(time);
    if (!shouldRun) {
      return;
    }
    var runScript = () => {};
    eval(action.script);
    const clients = workspace.clients.filter(c => c.actions.includes(action.id));
    clients.forEach(client => {
      const socket = getClientConnection(client.id);
      if (!socket) {
        return;
      }

      const sendMessage = (socketIndex, message) => {
        socket.send(JSON.stringify({
          socketIndex,
          message
        }));
      };

      runScript(client.objects, sendMessage);
    });
  });
}

module.exports = {
  startActionListener,
  runTimedActions,
};

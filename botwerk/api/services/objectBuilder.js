const { getWorkspace } = require('../services/workspaceService');
const { emit } = require('./eventHandler');

function updateObjectInClients(clients, modeler, content) {
  eval(modeler.rules["map"]);

  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    if (!client.objects) {
      client.objects = {};
    }

    try {
      const obj = mapObject(content);
      const isNewObject = !client.objects[obj._id];
      client.objects[obj._id] = {
        ...client.objects[obj._id],
        obj
      };
      
      console.log(obj);
      if (isNewObject) {
        emit("onObjectCreated", {
          clientId: client.id,
        });
      }
    } catch (e) {
      emit("LOG", `Error occured in modeler "${
        modeler.name
      }" when running Mapper rules for client "${
        client.name
      }"`);
      emit("LOG", e.message);
    }
  }
}

function getClientsUsingModeler(clients, modelerId) {
  const ret = [];
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].modelers.includes(modelerId)) {
      ret.push(clients[i]);
    }
  }
  return ret;
}

function updateObjectDataFromEvent(ev) {
  const { content } = ev;
  const socketIndex = 0;
  const workspace = getWorkspace();
  for (let i = 0; i < workspace.modelers.length; i++) {
    const modeler = workspace.modelers[i];
    const clients = getClientsUsingModeler(workspace.clients, modeler.id);

    // UPDATE
    try {
      eval(modeler.rules["update"]);
    } catch (e) {
      emit("LOG", `Error occured from modeler "${
        modeler.name
      }" when running Create/Update Object rules`);
      emit("LOG", e.message);
    }

    var res = onSocketPacketReceived(socketIndex, content);
    if (res) {
      updateObjectInClients(clients, modeler, content);
    }
  }
}

module.exports = {
  updateObjectDataFromEvent,
};
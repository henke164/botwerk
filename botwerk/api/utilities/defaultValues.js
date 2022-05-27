const { v4: uuidv4 } = require('uuid');

const defaultModeler = {
  id: uuidv4(),
  name: "Default Modeler",
  content: `/*
Define your model type here based on the packet content. 
*/

function onSocketPacketReceived(socketIndex, packet) {
/*
    Example:
    if (socketIndex === 0) {
      const { type, data } = JSON.parse(packet);
      if (type === "user_data") {
          return "User"
      }

      if (type === "user_data") {
          return "User"
      }
    }
*/

return null;
}`
};

const defaultClient = {
  id: uuidv4(),
  name: 'Default',
  actions: [],
  modelers: [{
    id: defaultModeler.id,
    name: defaultModeler.name,
  }]
};

const defaultWorkspace = {
  name: "Default workspace",
  clients: [defaultClient],
  actions: [],
  modelers: [{
    id: defaultModeler.id,
    name: defaultModeler.name,
  }],
};

module.exports = {
  defaultWorkspace,
  defaultClient,
  defaultModeler,
}
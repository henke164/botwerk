const { v4: uuidv4 } = require('uuid');

const defaultModeller = {
  id: uuidv4(),
  name: "Default Mapper",
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
  modellers: [{
    id: defaultModeller.id,
    name: defaultModeller.name,
  }]
};

const defaultWorkspace = {
  name: "Default workspace",
  clients: [defaultClient],
  actions: [],
  modellers: [{
    id: defaultModeller.id,
    name: defaultModeller.name,
  }],
};

module.exports = {
  defaultWorkspace,
  defaultClient,
  defaultModeller,
}
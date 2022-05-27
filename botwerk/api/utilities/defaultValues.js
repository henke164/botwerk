const defaultModeller = {
  id: "1",
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
  id: '123',
  name: 'Default',
  actions: [],
  modellers: []
};

const defaultWorkspace = {
  clients: [defaultClient],
  actions: [],
  modellers: [defaultModeller],
};

module.exports = {
  defaultWorkspace,
  defaultClient,
  defaultModeller,
}
const { v4: uuidv4 } = require('uuid');

const defaultModeler = {
  id: uuidv4(),
  name: "Default Modeler 2.0",
  rules: {
    update: 
`// Define rules that describes if the packet creates or updates an object. 
function onSocketPacketReceived(socketIndex, packet) {
    if (socketIndex !== 0) {
        return false;
    }
    const { type, data } = JSON.parse(packet);
    return type === "user_data";
}
`,
    remove: 
`// Define rules that describes if the packet removes an object. 
function onSocketPacketReceived(socketIndex, packet) {
    if (socketIndex !== 0) {
        return false;
    }
    const { type, data } = JSON.parse(packet);
    return type === "user_removed";
}
`,
    map: 
`
// Objects must always contain "_id" property

// Describe how to get existing object. the variable "objects" is a Map with all objects
function getExisting(packet) {
    const { data } = JSON.parse(packet);
    return objects[data.p.c.id];
}

// Define how the object will look like.
function map(packet, existing) {
    const { data } = JSON.parse(packet);
    return {
        _id: data.p.c.id,
        name: data.p.c.n,
        friends: [
            ...data.p.fds
        ],
    };
}
`,
  }
}

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
  modelers: [defaultModeler],
};

module.exports = {
  defaultWorkspace,
  defaultClient,
  defaultModeler,
}
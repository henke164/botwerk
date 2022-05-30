const { v4: uuidv4 } = require('uuid');

const defaultModeler = {
  id: uuidv4(),
  name: "Default Modeler",
  appearanceHTML: `<div class="wrapper">
    <div class="field">
        Id: {_id}
    </div>

    <div class="field">
        Name: {name}
    </div>

    <div class="field">
        Level: {level}
    </div>
  </div>
  <style>
    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #444;
    }
    
    .field {
        font-size: 12px;
        color: white;
        background: #999;
        margin: 10px;
        border: 1px solid #333;
        padding: 10px;
    }
  </style>`,
  rules: {
    update: 
`// Define rules that describes if the packet creates or updates an object. 
function onSocketPacketReceived(socketIndex, packet) {
    if (socketIndex !== 0) {
        return false;
    }

    return packet.t === "USER_DATA";
}
`,
    map: 
`// Define how the object will look like.
// Objects must always contain "_id" property
function mapObject(packet) {
    return {
        _id: packet.d.i,
        name: packet.d.n,
        level: packet.d.l
    };
}
`,
  }
}

const defaultClient = {
  id: uuidv4(),
  name: 'Default',
  actions: [],
  modelers: [defaultModeler.id],
  objects: {},
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
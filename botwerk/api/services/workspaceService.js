const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { defaultWorkspace, defaultModeler } = require('../utilities/defaultValues');

const cachePath = __dirname + "/../workspace-cache.json";
let currentWorkspace;
loadCachedWorkspace(cachePath);

function getWorkspace() {
  return currentWorkspace;
}

function saveWorkspace() {
  const copy = JSON.parse(JSON.stringify(currentWorkspace));
  delete copy.objects;
  fs.writeFileSync(cachePath, JSON.stringify(copy));
}

function loadCachedWorkspace(path) {
  if (!fs.existsSync(path)) {
    currentWorkspace = defaultWorkspace;
    return currentWorkspace
  }
  
  try {
    currentWorkspace = JSON.parse(fs.readFileSync(path));
  } catch {
    currentWorkspace = defaultWorkspace;
  }
  return currentWorkspace;
}

/* Client */
function updateClient({ id, name, actions, modelers }) {
  if (!name || name.length === 0) {
    name = "Client-" + Math.floor(Math.random() * 1000);
  }

  const index = currentWorkspace.clients.map(m => m.id).indexOf(id);
  if (index !== -1) {
    currentWorkspace.clients[index] = {
      ...currentWorkspace.clients[index],
      name,
      actions,
      modelers,
    };
    saveWorkspace();
    return currentWorkspace.clients[index];
  }

  const client = {
    id: uuidv4(),
    name,
    actions: actions || [],
    modelers: modelers || [],
    objects: {},
  }
  currentWorkspace.clients.push(client);
  saveWorkspace();
  return client;
}

function getClient(id) {
  const client = currentWorkspace.clients.find(m => m.id === id);
  return client;

}

function removeClient(id) {
  const index = currentWorkspace.clients.map(m => m.id).indexOf(id);
  if (index < 0) {
    return false;
  }

  currentWorkspace.clients.splice(index, 1);
  
  saveWorkspace();

  return true;
}

/* Modelers */
function getModeler(id) {
  const modeler = currentWorkspace.modelers.find(m => m.id === id);
  if (!modeler) {
    null
  }

  return modeler;
}

function getAllModelers() {
  return currentWorkspace.modelers.map(m => ({ id: m.id, name: m.name }));
}

function updateModeler(modeler) {
  if (currentWorkspace.modelers.filter(m => m.id !== modeler.id).map(m => m.name).includes(modeler.name)) {
    return {
      success: false,
      error: "Name already exists",
    };
  }
  
  const index = currentWorkspace.modelers.map(m => m.id).indexOf(modeler.id);
  if (index !== -1) {
    currentWorkspace.modelers[index] = modeler;
    saveWorkspace();

    return {
      success: true,
      modeler: currentWorkspace.modelers[index],
    }
  } 
  
  const newModeler = {
    ...defaultModeler,
    ...modeler,
    id: uuidv4(),
  };
  currentWorkspace.modelers.push(newModeler);

  saveWorkspace();

  return {
    success: true,
    modeler: newModeler,
  }; 
}

function removeModeler(id) {
  const index = currentWorkspace.modelers.map(m => m.id).indexOf(id);
  if (index < 0) {
    return {
      success: false,
      error: "Modeler not found",
    };
  }

  currentWorkspace.modelers.splice(index, 1);
  
  saveWorkspace();

  return {
    success: true,
  };
}

function getObject(clientId, objectId) {
  const client = currentWorkspace.clients.find(c => c.id === clientId);
  const object = client.objects[objectId];
  return object;
}

function deleteObject(clientId, objectId) {
  const client = currentWorkspace.clients.find(c => c.id === clientId);
  delete client.objects[objectId];
}

module.exports = {
  getModeler,
  getAllModelers,
  updateModeler,
  removeModeler,
  getClient,
  updateClient,
  removeClient,
  getWorkspace,
  saveWorkspace,
  getObject,
  deleteObject,
}
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { defaultWorkspace, defaultModeler } = require('../../utilities/defaultValues');

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
  getClient,
  updateClient,
  removeClient,
  getWorkspace,
  saveWorkspace,
  getObject,
  deleteObject,
}
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { defaultWorkspace, defaultModeler } = require('../utilities/defaultValues');

const cachePath = __dirname + "/workspace-cache.json";
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
    delete currentWorkspace.objects;
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
    objects: [],
  }
  currentWorkspace.clients.push(client);
  saveWorkspace();
  return client;
}

function removeClient(id) {
  const index = currentWorkspace.clients.map(m => m.id).indexOf(id);
  if (index < 0) {
    return {
      success: false,
      error: "Client not found",
    };
  }

  currentWorkspace.clients.splice(index, 1);
  
  saveWorkspace();

  return {
    success: true,
  };
}

/* Modelers */
function getModeler(id) {
  const modeler = currentWorkspace.modelers.find(m => m.id === id);
  if (!modeler) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    modeler
  };
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
    ...modeler
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

module.exports = {
  getModeler,
  getAllModelers,
  updateClient,
  removeClient,
  updateModeler,
  removeModeler,
  getWorkspace,
  saveWorkspace
}
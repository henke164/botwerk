const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { defaultWorkspace } = require('../utilities/defaultValues');

const cachePath = __dirname + "/workspace-cache.json";
let currentWorkspace;
loadCachedWorkspace(cachePath);

function getWorkspace() {
  if (!currentWorkspace) {
    importWorkspace(cachePath);
  }

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
  if (index < 0) {
    const client = {
      id: uuidv4(),
      name,
      actions: actions || [],
      modelers: modelers || [],
      objects: [],
    }
    currentWorkspace.clients.push(client);
  } else {
    currentWorkspace.clients[index] = {
      ...currentWorkspace.clients[index],
      name,
      actions,
      modelers,
    };
  }

  saveWorkspace();
}

/* Modelers */
function getModelerList() {
  return currentWorkspace.modelers.map(m => ({ id: m.id, name: m.name }));
}

function updateModeler({ id, name, content }) {
  if (currentWorkspace.modelers.filter(m => m.id !== id).map(m => m.name).includes(name)) {
    return {
      success: false,
      error: "Name already exists",
    };
  }
  
  const index = currentWorkspace.modelers.map(m => m.id).indexOf(id);
  if (index !== -1) {
    currentWorkspace.modelers[index] = {
      ...currentWorkspace.modelers[index],
      name,
      content
    };

    saveWorkspace();

    return {
      success: true,
      modeler: currentWorkspace.modelers[index],
    }
  } 
    
  const modeler = {
    id: uuidv4(),
    name,
    content: defaultModeler.content,
  };
  currentWorkspace.modelers.push(modeler);

  saveWorkspace();

  return {
    success: true,
    modeler
  }; 
}

function removeModeler(id) {
  const index = modelers.map(m => m.id).indexOf(id);
  if (index < 0) {
    return {
      success: false,
      error: "Modeler not found",
    };
  }

  modelers.splice(index, 1);
  
  saveWorkspace();

  return {
    success: true,
  };
}

module.exports = {
  getModelerList,
  removeModeler,
  updateClient,
  updateModeler,
  getWorkspace,
  saveWorkspace
}
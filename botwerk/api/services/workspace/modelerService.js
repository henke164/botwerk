const { getWorkspace } = require("./workspaceService");

function getModeler(id) {
  const currentWorkspace = getWorkspace();
  const modeler = currentWorkspace.modelers.find(m => m.id === id);
  if (!modeler) {
    null
  }

  return modeler;
}

function getAllModelers() {
  return getWorkspace().modelers.map(m => ({ id: m.id, name: m.name }));
}

function updateModeler(modeler) {
  const currentWorkspace = getWorkspace();
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
  const currentWorkspace = getWorkspace();
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
  updateModeler,
  removeModeler,
};

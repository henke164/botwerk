const { defaultModeler } = require('../utilities/defaultValues');
const { saveWorkspace } = require('./workspaceService');

const modelers = [ defaultModeler ];

function getModelerList() {
  return modelers.map(m => ({ id: m.id, name: m.name }));
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

function updateModeler(id, name, content) {
  if (modelers.filter(m => m.id !== id).map(m => m.name).includes(name)) {
    return {
      success: false,
      error: "Name already exists",
    };
  }
  
  const index = modelers.map(m => m.id).indexOf(id);
  if (index < 0) {
    return {
      success: false,
      error: "Modeler not found",
    };
  }

  modelers[index] = {
    ...modelers[index],
    name,
    content
  };

  saveWorkspace();

  return {
    success: true,
    modeler: modelers[index]
  }; 
}

function createModeler(name) {
  if (modelers.map(m => m.name).includes(name)) {
    return {
      success: false,
      error: "Name already exists"
    };
  }

  const id = Math.floor(Math.random() * 10000).toString();
  const modeler = {
    id,
    name,
    content: defaultModeler.content,
  };
  
  modelers.push(modeler);
  
  saveWorkspace();

  return {
    success: true,
    modeler
  };
}

module.exports = {
  getModelerList,
  removeModeler,
  updateModeler,
  createModeler,
};
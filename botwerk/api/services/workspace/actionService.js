const { defaultAction } = require("../../utilities/defaultValues");
const { getWorkspace, saveWorkspace } = require("./workspaceService");
const { v4: uuidv4 } = require('uuid');

function getAction(id) {
  const action = getWorkspace().actions.find(m => m.id === id);
  if (!action) {
    return null;
  }

  return action;
}

function getAllActions() {
  return getWorkspace().actions.map(m => ({ id: m.id, name: m.name }));
}

function updateAction(action) {
  const currentWorkspace = getWorkspace();
  if (currentWorkspace.actions.filter(m => m.id !== action.id).map(m => m.name).includes(action.name)) {
    return {
      success: false,
      error: "Name already exists",
    };
  }

  const index = currentWorkspace.actions.map(m => m.id).indexOf(action.id);
  if (index !== -1) {
    currentWorkspace.actions[index] = action;
    saveWorkspace();

    return {
      success: true,
      action: currentWorkspace.actions[index],
    }
  }

  const newAction = {
    ...defaultAction,
    ...action,
    id: uuidv4(),
  };
  currentWorkspace.actions.push(newAction);

  saveWorkspace();

  return {
    success: true,
    action: newAction,
  };
}

function removeAction(id) {
  const currentWorkspace = getWorkspace();
  const index = currentWorkspace.actions.map(m => m.id).indexOf(id);
  if (index < 0) {
    return {
      success: false,
      error: "Action not found",
    };
  }

  currentWorkspace.actions.splice(index, 1);

  saveWorkspace();

  return {
    success: true,
  };
}

module.exports = {
  getAction,
  getAllActions,
  removeAction,
  updateAction,
}
const fs = require('fs');
const { defaultWorkspace } = require('../utilities/defaultValues');

const cachePath = __dirname + "/workspace-cache.json";
let currentWorkspace;

function getWorkspace() {
  if (currentWorkspace) {
    return currentWorkspace;
  }

  return importWorkspace(cachePath);
}

function saveWorkspace() {
  fs.writeFileSync(cachePath, JSON.stringify(currentWorkspace));
}

function importWorkspace(path) {
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

module.exports = {
  getWorkspace,
  importWorkspace,
  saveWorkspace
}
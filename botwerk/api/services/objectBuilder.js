const { getWorkspace } = require('../services/workspaceService');

function updateObjectDataFromEvent(ev) {
  console.log("Updating object data", ev);
  const workspace = getWorkspace();
}

module.exports = {
  updateObjectDataFromEvent,
};
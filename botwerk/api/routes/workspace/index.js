const express = require("express");
const router = express.Router();

const {
  getWorkspace,
  getClient,
  updateClient,
  removeClient,
  getObject,
  deleteObject,
} = require('../../services/workspace/workspaceService');

const { replaceAppearanceValues } = require('../../utilities/visualizer');

const action = require('./action');
const modeler = require('./modeler');

router.use("/action", action);
router.use("/modeler", modeler);

router.get("/", (req, res) => {
  const workspace = getWorkspace();
  res.send({
    success: true,
    workspace
  });
});

router.get("/client/:id", (req, res) => {
  const client = getClient(req.params.id);
  res.send({
    success: true,
    client
  });
});

router.post("/client", (req, res) => {
  const client = updateClient(req.body);
  res.send({
    success: true,
    client
  });
});

router.delete("/client/:id", (req, res) => {
  const success = removeClient(req.params.id);
  res.send({
    success
  });
});

router.get("/object/:clientId/:objectId", (req, res) => {
  const object = getObject(req.params.clientId, req.params.objectId);
  const modeler = getModeler(object._modeler);
  const appearanceHTML = replaceAppearanceValues(modeler.appearanceHTML, object);

  const clone = JSON.parse(JSON.stringify(object));
  clone._modeler = modeler.name;

  res.send({
    object: clone,
    appearanceHTML,
    success: true,
  });
});

router.delete("/object/:clientId/:objectId", (req, res) => {
  deleteObject(req.params.clientId, req.params.objectId);
  res.send({
    success: true,
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getWorkspace,
  getModeler,
  getAllModelers,
  removeModeler,
  updateModeler,
  getClient,
  updateClient,
  removeClient,
  getObject,
  deleteObject,
} = require('../../services/workspaceService');

const { replaceAppearanceValues } = require('../../utilities/visualizer');

router.get("/", (req, res) => {
  const workspace = getWorkspace();
  res.send({
    success: true,
    workspace
  });
});

router.get("/modeler/:id", (req, res) => {
  const modeler = getModeler(req.params.id);
  res.send({
    success: true,
    modeler
  });
});

router.get("/modeler", (req, res) => {
  const list = getAllModelers();
  res.send(list);
});

router.post("/modeler", (req, res) => {
  const modeler = updateModeler(req.body);
  res.send(modeler);
});

router.delete("/modeler/:id", (req, res) => {
  const status = removeModeler(req.params.id);
  res.send(status);
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
    object: {
      _id: object._id,
      _modeler: clone._modeler,
      ...clone
    },
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

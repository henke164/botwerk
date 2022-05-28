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
} = require('../../services/workspaceService');

router.get("/", (req, res) => {
  const workspace = getWorkspace();
  res.send({
    success: true,
    workspace
  });
});

router.get("/modeler/:id", (req, res) => {
  const modeler = getModeler(req.params.id);
  res.send(modeler);
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

module.exports = router;

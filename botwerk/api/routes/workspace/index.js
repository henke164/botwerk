const express = require("express");
const { createClient } = require("../../services/clientService");
const router = express.Router();

const {
  getWorkspace,
  saveWorkspace,
} = require('../../services/workspaceService');

router.get("/", (req, res) => {
  const workspace = getWorkspace();
  res.send({
    success: true,
    workspace
  });
});

router.post("/client", (req, res) => {
  const workspace = getWorkspace();
  const client = createClient(req.body.name);
  workspace.clients.push(client);
  saveWorkspace();

  res.send({
    success: true,
    client
  });
});

router.put("/", (req, res) => {
  saveWorkspace(req.body);
  res.send({
    success: true
  });
});

router.delete("/:id", (req, res) => {
  const status = removeModeler(req.params.id);
  res.send(status);
});

module.exports = router;

const express = require("express");
const {
  getModeler,
  getAllModelers,
  removeModeler,
  updateModeler,
} = require('../../services/workspace/workspaceService');
const router = express.Router();

router.get("/:id", (req, res) => {
  const modeler = getModeler(req.params.id);
  res.send({
    success: true,
    modeler
  });
});

router.get("/", (req, res) => {
  const list = getAllModelers();
  res.send(list);
});

router.post("/", (req, res) => {
  const modeler = updateModeler(req.body);
  res.send(modeler);
});

router.delete("/:id", (req, res) => {
  const status = removeModeler(req.params.id);
  res.send(status);
});

module.exports = router;
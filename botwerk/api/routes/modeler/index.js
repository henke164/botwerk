const express = require("express");
const router = express.Router();

const { getModelerList, updateModeler, createModeler, removeModeler } = require('../../services/modelerService');

router.get("/", (req, res) => {
  const list = getModelerList();
  res.send(list);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const modeler = createModeler(name);
  res.send(modeler);
});

router.put("/", (req, res) => {
  const { id, name, content } = req.body;
  const updated = updateModeler(id, name, content);
  res.send(updated);
});

router.delete("/:id", (req, res) => {
  const status = removeModeler(req.params.id);
  res.send(status);
});

module.exports = router;

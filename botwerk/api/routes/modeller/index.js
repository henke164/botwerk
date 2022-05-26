const express = require("express");
const router = express.Router();

const { getModellerList, updateModeller, createModeller, removeModeller } = require('../../services/modellerService');

router.get("/", (req, res) => {
  const list = getModellerList();
  res.send(list);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const modeller = createModeller(name);
  res.send(modeller);
});

router.put("/", (req, res) => {
  const { id, name, content } = req.body;
  const updated = updateModeller(id, name, content);
  res.send(updated);
});

router.delete("/:id", (req, res) => {
  const status = removeModeller(req.params.id);
  res.send(status);
});

module.exports = router;

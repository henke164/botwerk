const express = require("express");
const { getAction, getAllActions, updateAction, removeAction } = require("../../services/workspace/actionService");
const router = express.Router();

router.get("/:id", (req, res) => {
  const action = getAction(req.params.id);
  res.send({
    success: true,
    action
  });
});

router.get("/", (req, res) => {
  const list = getAllActions();
  res.send(list);
});

router.post("/", (req, res) => {
  const action = updateAction(req.body);
  res.send(action);
});

router.delete("/:id", (req, res) => {
  const status = removeAction(req.params.id);
  res.send(status);
});

module.exports = router;
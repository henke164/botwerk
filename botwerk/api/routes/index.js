const express = require("express");

const router = express.Router();

const workspace = require("./workspace");

router.use("/workspace", workspace);

module.exports = router;

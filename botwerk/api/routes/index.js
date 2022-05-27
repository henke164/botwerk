const express = require("express");

const router = express.Router();

const modeler = require("./modeler");
const workspace = require("./workspace");

router.use("/modeler", modeler);
router.use("/workspace", workspace);

module.exports = router;

const express = require("express");

const router = express.Router();

const modeller = require("./modeller");
const workspace = require("./workspace");

router.use("/modeller", modeller);
router.use("/workspace", workspace);

module.exports = router;

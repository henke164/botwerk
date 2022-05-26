const express = require("express");

const router = express.Router();

const modeller = require("./modeller");

router.use("/modeller", modeller);

module.exports = router;

const express = require("express");

const router = express.Router();

router.post("/reister");
router.post("/login");
router.post("/logout");

module.exports = router;

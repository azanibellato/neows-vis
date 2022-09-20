const express = require('express');
const router = express.Router();
const NeowsController = require("../controller/neows.controller");

router.get('/neows-week/', NeowsController.getWeek);

module.exports = router;

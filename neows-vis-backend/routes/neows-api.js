const express = require('express');
const router = express.Router();
const NeowsController = require("../controllers/neows.controller");

router.get('/neows-day/:day/', NeowsController.getDay);

module.exports = router;

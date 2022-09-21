const express = require('express');
const router = express.Router();
const NeowsController = require("../controllers/neows.controller");

router.get('/neows-day/:day/', NeowsController.getDay);
router.get('/neows-brightest/', NeowsController.getWeekBrightest);

module.exports = router;

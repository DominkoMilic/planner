const express = require("express");
const { findAllPlans } = require("../controllers/findAllPlansController");

const router = express.Router();

router.get("/findPlans", findAllPlans);

module.exports = router;

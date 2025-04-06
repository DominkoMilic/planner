const express = require("express");
const { addPlan } = require("../controllers/addPlanController");

const router = express.Router();

router.post("/addPlan", addPlan);

module.exports = router;

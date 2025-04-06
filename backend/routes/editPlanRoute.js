const express = require("express");
const { editPlan } = require("../controllers/editPlanController");

const router = express.Router();

router.post("/editPlan", editPlan);

module.exports = router;

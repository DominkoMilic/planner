const express = require("express");
const { deletePlan } = require("../controllers/deletePlanController");

const router = express.Router();

router.delete("/deletePlan", deletePlan);

module.exports = router;

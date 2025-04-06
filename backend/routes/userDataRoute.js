const express = require("express");
const { fetchAuthenticatedUser } = require("../controllers/userDataController");

const router = express.Router();

router.get("/auth/user", fetchAuthenticatedUser);

module.exports = router;

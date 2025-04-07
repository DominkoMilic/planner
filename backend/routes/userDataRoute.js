const express = require("express");
const { fetchAuthenticatedUser } = require("../controllers/userDataController");
const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/auth/user", authenticateUser, fetchAuthenticatedUser);

module.exports = router;

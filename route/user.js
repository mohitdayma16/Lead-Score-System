const express = require("express");
const router = express.Router();

const { createUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUser");
const { Login } = require("../controller/Login");

router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.post("/Login", Login);

module.exports = router;

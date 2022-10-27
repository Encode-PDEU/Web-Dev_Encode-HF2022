// Route to create a process and save it in DB
// Base path: "/create"

const express = require("express");
const router = express.Router();

// controllers
const createController = require("../controllers/createController");

router.post("/", createController.create);

module.exports = router;
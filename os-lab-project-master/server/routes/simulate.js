// Route for simulating the cpu scheduling algorithms
// Base path: '/simulate'

const express = require("express");
const router = express.Router();

// controllers
const simulateController = require("../controllers/simulateController");

// POST on simulate
router.post("/", simulateController.simulate);

module.exports = router;
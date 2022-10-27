// Route to delete process
// Base path: '/delete'

const express = require("express");
const router = express.Router();

const deleteController = require("../controllers/deleteController");

// POST request for deletion
router.post("/", deleteController.delete);

module.exports = router;
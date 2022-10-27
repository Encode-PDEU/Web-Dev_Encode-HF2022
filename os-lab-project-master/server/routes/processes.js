// The route for getting all the processes
// This will retrieve the processes from the database
// and send it back as a json response

// Base path is '/processes'

const express = require("express");
const router = express.Router();

const processesController = require("../controllers/processesController");

// GET processes
router.get("/", processesController.getAll);

module.exports = router;
// Route for the '/' home page

const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// GET home
router.get("/", homeController.index);

module.exports = router;
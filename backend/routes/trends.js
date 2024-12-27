const express = require("express");
const { getTrends, runScript } = require("../controllers/trendsController");

const router = express.Router();

// Route to fetch all trends
router.get("/", getTrends);

// Route to run Selenium script
router.post("/run", runScript);

module.exports = router;

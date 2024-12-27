const Trend = require("../models/trendsModel");
const { runSeleniumScript } = require("../utils/seleniumScript");

// Get all trends from MongoDB
const getTrends = async (req, res) => {
  try {
    const trends = await Trend.find();
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Run Selenium script and save data to MongoDB
const runScript = async (req, res) => {
  try {
    const result = await runSeleniumScript();
    // console.log(result);
    const newTrend = new Trend(result);
    await newTrend.save();
    res.json(newTrend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTrends, runScript };

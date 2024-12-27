const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const bodyParser = require("body-parser");
const trendsRoutes = require("./routes/trends");
const { connectDB } = require("./config/db");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.get("/", (req,res) => {
  res.send("working fine")
});
app.use(cors());
// Database connection
connectDB();

// Routes
app.use("/api/trends", trendsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

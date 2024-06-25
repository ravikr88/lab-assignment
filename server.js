// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const colors = require("colors");
const port = process.env.PORT || 3000;

const materials = require("./routes/materials");

const connectDB = require("./config/db");
connectDB();
dotenv.config();

const app = express();

// Middleware
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads")); // Serve static files from the uploads folder

app.use("/materials", materials);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

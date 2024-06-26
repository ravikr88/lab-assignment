const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDB = require("./config/db");
const materials = require("./routes/materials");

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads")); // Serve static files from the uploads folder

app.use("/materials", materials);

module.exports = app;

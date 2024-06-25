const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

// Function to connect to MongoDB database using Mongoose
const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined in environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log successful connection
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Log and exit the process with error message if connection fails
    console.error(`Error: ${error.message}`.red);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;

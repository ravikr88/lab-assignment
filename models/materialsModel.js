const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for the material"], // Material name, required field with a custom error message.
    },
    technology: {
      type: String,
      required: [true, "Please add the printing technology used"], // Printing technology used, required field.
    },
    colors: {
      type: [String],
      required: [true, "Please add available colors"], // List of available colors, required field.
    },
    pricePerGram: {
      type: Number,
      required: [true, "Please add the price per gram"], // Price per gram, required field.
    },
    applicationTypes: {
      type: [String],
      required: [true, "Please add applicaton types"], // Price per gram, required field.
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image URL"], // Image URL of the material, required field.
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps.
  }
);

module.exports = mongoose.model("Materials", materialSchema);

const { json } = require("body-parser");
const Materials = require("../models/materialsModel");
const fs = require("fs");
const path = require("path");

// Get all materials excluding the 'imageUrl' field
const getMaterials = async (req, res) => {
  try {
    const materials = await Materials.find({}, { imageUrl: 0 });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single material by its ID, including its image if it exists
const getMaterialById = async (req, res) => {
  try {
    const material = await Materials.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    const imagePath = path.join(__dirname, "..", material.imageUrl);

    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image not found" });
    }
    //
    res.status(200).json({ material });
    //
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add a new material with optional image upload
const addMaterial = async (req, res) => {
  const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  const newMaterial = new Materials({
    name,
    technology,
    colors: colors.split(",").map((color) => color.trim()),
    pricePerGram,
    imageUrl,
    applicationTypes: applicationTypes.split(",").map((type) => type.trim()),
  });

  try {
    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing material by its ID, optionally updating its associated image
const updateMaterialById = async (req, res) => {
  const { id } = req.params;

  try {
    let material = await Materials.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Update textual fields from form-data if provided
    if (req.body.name) {
      material.name = req.body.name;
    }
    if (req.body.technology) {
      material.technology = req.body.technology;
    }
    if (req.body.colors) {
      material.colors = req.body.colors.split(",").map((color) => color.trim());
    }
    if (req.body.pricePerGram) {
      material.pricePerGram = req.body.pricePerGram;
    }
    if (req.body.applicationTypes) {
      material.applicationTypes = req.body.applicationTypes
        .split(",")
        .map((type) => type.trim());
    }

    // Handle image upload if new image is provided
    if (req.file) {
      const newImagePath = req.file.path;
      const oldImagePath = path.join(__dirname, "..", material.imageUrl);

      // Update image URL in material document
      material.imageUrl = newImagePath;

      // Delete old image file if it exists and is different from new image
      if (fs.existsSync(oldImagePath) && oldImagePath !== newImagePath) {
        fs.unlinkSync(oldImagePath); // Delete old image file
      }
    }

    // Save the updated material document
    material = await material.save();

    res.status(200).json(material);
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a material by its ID, including its associated image file
const deleteMaterialById = async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Materials.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Construct absolute path to the image file
    const imagePath = path.join(__dirname, "..", material.imageUrl);

    // Check if the image file exists before attempting deletion
    if (fs.existsSync(imagePath)) {
      try {
        await fs.promises.unlink(imagePath); // Delete the image file
        // console.log("Image deleted successfully");
      } catch (err) {
        console.error("Failed to delete local image:", err);
        return res
          .status(500)
          .json({ message: "Failed to delete local image", error: err });
      }
    } else {
      console.log("Image file does not exist at path:", imagePath);
    }

    // Delete the material from the database
    await Materials.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: `Material with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMaterials,
  getMaterialById,
  addMaterial,
  updateMaterialById,
  deleteMaterialById,
};

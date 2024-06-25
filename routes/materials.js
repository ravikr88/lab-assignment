const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");

const {
  getMaterials,
  getMaterialById,
  addMaterial,
  updateMaterialById,
  deleteMaterialById,
} = require("../controllers/materialsController");

// GET all materials
router.route("/").get(getMaterials);

// GET a single material by ID
router.route("/:id").get(getMaterialById);

// POST a new material (with image upload)
router.route("/").post(upload, addMaterial);

// PUT for updating material with multer middleware
router.route("/:id").put(upload, updateMaterialById);

// DELETE a material by ID
router.route("/:id").delete(deleteMaterialById);

module.exports = router;

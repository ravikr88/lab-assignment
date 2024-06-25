const multer = require("multer");
const path = require("path");

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: "./uploads/", // Destination directory where uploaded files will be stored
  filename: (req, file, cb) => {
    // Callback function to determine the filename of the uploaded file
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
    // Generates filename as 'fieldname-timestamp.extension' (e.g., 'image-1630478924123.jpg')
  },
});

// Function to check the file type before saving
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
  const mimetype = filetypes.test(file.mimetype); // Check file mimetype

  if (mimetype && extname) {
    // If file type matches allowed types
    return cb(null, true);
  } else {
    // If file type does not match allowed types
    cb("Error: Images Only!"); // Callback with error message
  }
}

// Initialize multer upload middleware
const upload = multer({
  storage: storage, // Set storage engine for file storage
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    // File filter function to restrict uploads to specified file types
    checkFileType(file, cb); // Use checkFileType function to validate file type
  },
}).single("image"); // Handle single file upload with field name 'image'

module.exports = upload; // Export upload middleware for use in other parts of the application

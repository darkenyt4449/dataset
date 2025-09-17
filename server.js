const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public")); // Serve static frontend files

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set in Render Environment Variables
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.array("files", 6), (req, res) => {
  // Cloudinary returns an array of uploaded files with URLs
  const files = req.files.map(file => ({
    url: file.path,       // The URL of the uploaded image
    filename: file.filename
  }));

  res.json({ message: "Uploaded successfully", files });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

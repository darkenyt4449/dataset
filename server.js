const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve static files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, "public")));

// storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post("/upload", upload.array("files", 6), (req, res) => {
  res.json({ message: "Uploaded successfully", files: req.files });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

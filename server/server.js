import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
import employeeRoutes from "./routes/employees.js";

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 1000000);
};

// Set up storage engine using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' folder
  },

  filename: (req, file, cb) => {
    const randomNumber = generateRandomNumber();
    const fileExtension = path.extname(file.originalname); // Extract file extension
    cb(null, `${randomNumber}${fileExtension}`); // Use random number and original file extension as filename
  },
});
const upload = multer({ storage: storage });

// Route for handling file uploads
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "Content-Range");
  next();
});

app.use("/", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

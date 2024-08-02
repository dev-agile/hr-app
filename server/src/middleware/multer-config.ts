import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Base directory for uploads
const baseUploadDir = path.join(__dirname, '../uploads');

// Create the base directory if it does not exist
if (!fs.existsSync(baseUploadDir)) {
  fs.mkdirSync(baseUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define directories for different field names
    const attendanceDir = path.join(baseUploadDir, 'attendance');
    const photoDir = path.join(baseUploadDir, 'photos');
    const documentsDir = path.join(baseUploadDir, 'documents');

    // Create directories if they do not exist
    if (!fs.existsSync(attendanceDir)) {
      fs.mkdirSync(attendanceDir, { recursive: true });
    }
    if (!fs.existsSync(photoDir)) {
      fs.mkdirSync(photoDir, { recursive: true });
    }
    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir, { recursive: true });
    }

    // Decide the directory based on the field name
    switch (file.fieldname) {
      case 'attendance':
        cb(null, attendanceDir);
        break;
      case 'photo':
        cb(null, photoDir);
        break;
      case 'documents':
        cb(null, documentsDir);
        break;
      default:
        cb(new Error('Invalid field name'), '');
    }
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|csv/; // Add any additional document types here
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

export default upload;
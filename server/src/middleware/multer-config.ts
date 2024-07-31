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
    // Get employee name from the request body, if available
    const employeeName = req.body.first_name || 'default';
    const sanitizedEmployeeName = employeeName.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize name

    // Define the directory for the employee
    const employeeDir = path.join(baseUploadDir, sanitizedEmployeeName);
    const documentsDir = path.join(employeeDir, 'documents');

    // Create directories if they do not exist
    if (!fs.existsSync(employeeDir)) {
      fs.mkdirSync(employeeDir, { recursive: true });
    }
    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir, { recursive: true });
    }

    // Decide the directory based on the field name
    if (file.fieldname === 'photo') {
      cb(null, employeeDir);
    } else if (file.fieldname === 'documents') {
      cb(null, documentsDir); // Save documents in the documents subdirectory
    } else {
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
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/; // Add any additional document types here
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

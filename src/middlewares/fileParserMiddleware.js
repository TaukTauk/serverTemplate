// fileParserMiddleware.js
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || 10) * 1024 * 1024
  }
});

// Helper to format multer files to your format
const formatMulterFile = (multerFile) => ({
  data: multerFile.buffer,
  name: multerFile.originalname,
  mimetype: multerFile.mimetype,
  encoding: multerFile.encoding || '7bit'
});

// Middleware wrapper that formats files automatically
const createFileParser = (multerMiddleware) => {
  return [
    multerMiddleware,
    (req, res, next) => {
      // Format single file
      if (req.file) {
        req.file = formatMulterFile(req.file);
      }
      
      // Format multiple files
      if (req.files) {
        if (Array.isArray(req.files)) {
          req.files = req.files.map(formatMulterFile);
        } else {
          Object.keys(req.files).forEach(fieldname => {
            req.files[fieldname] = req.files[fieldname].map(formatMulterFile);
          });
        }
      }
      next();
    }
  ];
};

// Export pre-configured parsers
export const singleFile = (fieldname) => 
  createFileParser(upload.single(fieldname));

export const multipleFields = (fields) => 
  createFileParser(upload.fields(fields));

export const arrayFiles = (fieldname, maxCount) => 
  createFileParser(upload.array(fieldname, maxCount));

export const anyFiles = () => 
  createFileParser(upload.any());

export default upload;
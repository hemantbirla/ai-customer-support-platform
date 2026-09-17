import multer from "multer";
import path from "path";
import fs from "fs";

// ==========================================
// Upload Directory
// ==========================================

const uploadDirectory = path.resolve("uploads/chat");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

// ==========================================
// Storage
// ==========================================

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${extension}`;

    cb(null, filename);
  },
});

// ==========================================
// Allowed MIME Types
// ==========================================

export const ALLOWED_CHAT_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// ==========================================
// File Filter
// ==========================================

const fileFilter = (_req, file, cb) => {
  console.log("📎 Multer received file:", {
    name: file.originalname,
    mimetype: file.mimetype,
    fieldname: file.fieldname,
    size: file.size,
  });

  if (!ALLOWED_CHAT_FILE_TYPES.includes(file.mimetype)) {
    return cb(
      new Error(`File type "${file.mimetype}" is not supported.`),
      false,
    );
  }

  cb(null, true);
};

// ==========================================
// Multer Configuration
// ==========================================

const uploadChatFile = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 5,
  },
});

export default uploadChatFile;

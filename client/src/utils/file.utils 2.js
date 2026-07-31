// ==========================================
// Format File Size
// ==========================================

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(2))} ${
    units[index]
  }`;
};

// ==========================================
// Validate File Type
// ==========================================

export const isAllowedFileType = (file, accept) => {
  if (!accept) return true;

  const allowedExtensions = accept
    .split(",")
    .map((item) => item.trim().toLowerCase());

  const fileExtension = `.${file.name.split(".").pop().toLowerCase()}`;

  return allowedExtensions.includes(fileExtension);
};

// ==========================================
// Validate File Size
// ==========================================

export const isValidFileSize = (file, maxFileSize) => {
  return file.size <= maxFileSize;
};

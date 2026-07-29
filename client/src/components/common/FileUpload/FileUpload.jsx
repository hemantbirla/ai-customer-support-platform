import { useMemo } from "react";
import PropTypes from "prop-types";
import { Upload, X, FileText } from "lucide-react";

import {
  formatFileSize,
  isAllowedFileType,
  isValidFileSize,
} from "../../../utils/file.utils";

import styles from "./FileUpload.module.css";

const DEFAULT_ACCEPT = ".pdf,.png,.jpg,.jpeg,.doc,.docx";

const FileUpload = ({
  value = [],
  onChange,
  accept = DEFAULT_ACCEPT,
  multiple = true,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024,
  disabled = false,
  error = "",
}) => {
  const files = useMemo(() => {
    if (!value) return [];

    return Array.from(value);
  }, [value]);

  // ==========================================
  // File Selection
  // ==========================================

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    const updatedFiles = [...files];

    for (const file of selectedFiles) {
      if (updatedFiles.length >= maxFiles) break;

      if (!isAllowedFileType(file, accept)) continue;

      if (!isValidFileSize(file, maxFileSize)) continue;

      updatedFiles.push(file);
    }

    onChange(updatedFiles);

    // Reset input so same file can be selected again
    event.target.value = "";
  };

  // ==========================================
  // Remove File
  // ==========================================

  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    onChange(updatedFiles);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Attachments</label>

      <label
        className={`${styles.uploadBox} ${disabled ? styles.disabled : ""}`}
      >
        <Upload size={22} />

        <span>Choose Files</span>

        <small>
          Maximum {maxFiles} files • {maxFileSize / 1024 / 1024} MB each
        </small>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className={styles.input}
          onChange={handleFileChange}
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <FileText size={18} />

                <div>
                  <p className={styles.fileName}>{file.name}</p>

                  <span className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>

              {!disabled && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemove(index)}
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

  onChange: PropTypes.func.isRequired,

  accept: PropTypes.string,

  multiple: PropTypes.bool,

  maxFiles: PropTypes.number,

  maxFileSize: PropTypes.number,

  disabled: PropTypes.bool,

  error: PropTypes.string,
};

export default FileUpload;

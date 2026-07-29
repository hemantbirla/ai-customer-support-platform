import PropTypes from "prop-types";
import { Upload, X, FileText } from "lucide-react";

import {
  formatFileSize,
  isAllowedFileType,
  isValidFileSize,
} from "../../../utils/file.utils";

import styles from "./FileUpload.module.css";

const FileUpload = ({
  value = [],
  onChange,
  accept = ".pdf,.png,.jpg,.jpeg,.doc,.docx",
  multiple = true,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024,
  disabled = false,
  error,
}) => {
  const files = Array.isArray(value) ? value : [];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    let updatedFiles = [...files];

    selectedFiles.forEach((file) => {
      if (
        updatedFiles.length < maxFiles &&
        isAllowedFileType(file, accept) &&
        isValidFileSize(file, maxFileSize)
      ) {
        updatedFiles.push(file);
      }
    });

    onChange(updatedFiles);

    e.target.value = "";
  };

  const removeFile = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Attachments</label>

      <label
        className={`${styles.uploadBox} ${disabled ? styles.disabled : ""}`}
      >
        <Upload size={36} />

        <h4>Choose Files</h4>

        <p>
          Maximum {maxFiles} files • {maxFileSize / 1024 / 1024} MB each
        </p>

        <input
          className={styles.input}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={handleFileChange}
        />
      </label>

      {error && <span className={styles.error}>{error}</span>}

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <div className={styles.left}>
                <FileText size={18} />

                <div>
                  <div className={styles.fileName}>{file.name}</div>

                  <div className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>

              {!disabled && (
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFile(index)}
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
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

export default FileUpload;

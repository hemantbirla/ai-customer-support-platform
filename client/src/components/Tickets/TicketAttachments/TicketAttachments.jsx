import PropTypes from "prop-types";
import { Download, FileText, FileImage, FileArchive, File } from "lucide-react";

import { formatFileSize } from "../../../utils/file.utils";

import styles from "./TicketAttachments.module.css";

const getFileIcon = (fileName = "") => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "webp":
      return <FileImage size={20} />;

    case "pdf":
    case "doc":
    case "docx":
    case "txt":
      return <FileText size={20} />;

    case "zip":
    case "rar":
    case "7z":
      return <FileArchive size={20} />;

    default:
      return <File size={20} />;
  }
};

const TicketAttachments = ({ attachments = [] }) => {
  const handleDownload = (attachment) => {
    window.open(attachment.url, "_blank");
  };

  return (
    <section className={styles.card}>
      <h3>Attachments</h3>

      {attachments.length === 0 ? (
        <p className={styles.empty}>No attachments available.</p>
      ) : (
        <div className={styles.list}>
          {attachments.map((attachment) => (
            <div key={attachment._id} className={styles.item}>
              <div className={styles.left}>
                <span className={styles.icon}>
                  {getFileIcon(attachment.fileName)}
                </span>

                <div>
                  <p className={styles.name}>{attachment.fileName}</p>

                  <span className={styles.size}>
                    {formatFileSize(attachment.fileSize)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.download}
                onClick={() => handleDownload(attachment)}
              >
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

TicketAttachments.propTypes = {
  attachments: PropTypes.array,
};

export default TicketAttachments;

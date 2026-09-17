import { Check, CheckCheck, FileText } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import usePresence from "../../hooks/usePresence";

import { getAttachmentUrl } from "../../utils/attachment";

import "./chat.css";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();
  const { isOnline } = usePresence();

  const mine = String(message.sender?._id) === String(user?._id);

  const online = isOnline(message.sender?._id);

  const renderStatus = () => {
    if (!mine) return null;

    if (message.readAt) {
      return (
        <span className="message-status read">
          <CheckCheck size={14} />
        </span>
      );
    }

    if (message.deliveredAt) {
      return (
        <span className="message-status delivered">
          <CheckCheck size={14} />
        </span>
      );
    }

    return (
      <span className="message-status sent">
        <Check size={14} />
      </span>
    );
  };

  const renderAttachments = () => {
    if (
      !Array.isArray(message.attachments) ||
      message.attachments.length === 0
    ) {
      return null;
    }

    return (
      <div className="message-attachments">
        {message.attachments.map((attachment, index) => {
          const attachmentUrl = getAttachmentUrl(attachment.url);

          const isImage = attachment.type?.startsWith("image/");

          console.log("📎 Attachment:", {
            name: attachment.name,
            originalUrl: attachment.url,
            finalUrl: attachmentUrl,
            type: attachment.type,
          });

          return (
            <a
              key={`${attachment.url}-${index}`}
              href={attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="message-attachment"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {isImage ? (
                <img
                  src={attachmentUrl}
                  alt={attachment.name}
                  className="message-attachment-image"
                  loading="lazy"
                />
              ) : (
                <div className="message-file">
                  <FileText size={22} />

                  <div>
                    <div className="message-file-name">{attachment.name}</div>

                    <div className="message-file-size">
                      {(attachment.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`message-row ${mine ? "message-self" : "message-other"}`}>
      {!mine && (
        <div className="message-avatar-wrapper">
          <img
            src={
              message.sender?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                message.sender?.name || "User",
              )}`
            }
            className="message-avatar"
            alt={message.sender?.name || "User"}
          />

          <span className={`presence-dot ${online ? "online" : "offline"}`} />
        </div>
      )}

      <div className="message-bubble">
        <div className="message-author">{message.sender?.name}</div>

        {message.message && (
          <div className="message-text">{message.message}</div>
        )}

        {renderAttachments()}

        <div className="message-footer">
          <span className="message-time">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

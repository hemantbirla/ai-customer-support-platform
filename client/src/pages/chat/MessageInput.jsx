import { useRef, useState } from "react";

import { File, Image, Paperclip, Send, X } from "lucide-react";

import { toast } from "react-toastify";

import { socket } from "../../socket/socket";

import chatService from "../../services/chatService";

import "./chat.css";

// ==========================================
// Constants
// ==========================================

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const MAX_FILES = 5;

const ALLOWED_TYPES = [
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
// Component
// ==========================================

const MessageInput = ({ onSend, sending, ticketId }) => {
  const [message, setMessage] = useState("");

  const [attachments, setAttachments] = useState([]);

  const [uploading, setUploading] = useState(false);

  const typingTimeout = useRef(null);

  const fileInputRef = useRef(null);

  // ========================================
  // Open File Picker
  // ========================================

  const handleAttachmentClick = () => {
    if (sending || uploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  // ========================================
  // File Selection
  // ========================================

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    // ======================================
    // Check Maximum File Count
    // ======================================

    const currentCount = attachments.length;

    const remainingSlots = MAX_FILES - currentCount;

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${MAX_FILES} attachments allowed.`);

      event.target.value = "";

      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      toast.warning(
        `Only ${remainingSlots} more attachment${
          remainingSlots > 1 ? "s are" : " is"
        } allowed.`,
      );
    }

    // ======================================
    // Validate Files
    // ======================================

    const validFiles = [];

    for (const file of selectedFiles) {
      // ------------------------------------
      // File Type
      // ------------------------------------

      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: File type is not supported.`);

        continue;
      }

      // ------------------------------------
      // File Size
      // ------------------------------------

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: Maximum file size is 10 MB.`);

        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      event.target.value = "";

      return;
    }

    // ======================================
    // Upload
    // ======================================

    try {
      setUploading(true);

      console.log(
        "📎 Uploading attachments:",
        validFiles.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      );
      console.log("📎 Files going to upload:", validFiles);

      const formDataTest = new FormData();

      validFiles.forEach((file) => {
        formDataTest.append("files", file);
      });

      console.log(
        "📎 FormData entries:",
        [...formDataTest.entries()].map(([key, value]) => ({
          key,
          name: value.name,
          type: value.type,
          size: value.size,
        })),
      );
      const response = await chatService.uploadAttachments(validFiles);

      console.log("📎 Attachment upload response:", response);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to upload attachments.");
      }

      // ====================================
      // Normalize Response
      // ====================================

      const uploadedFiles = Array.isArray(response.data)
        ? response.data
        : response.data
          ? [response.data]
          : [];

      if (uploadedFiles.length === 0) {
        throw new Error("Server did not return uploaded attachment data.");
      }

      // ====================================
      // Store Attachments
      // ====================================

      setAttachments((prev) => [...prev, ...uploadedFiles]);

      toast.success(
        `${uploadedFiles.length} attachment${
          uploadedFiles.length > 1 ? "s" : ""
        } uploaded.`,
      );
    } catch (error) {
      console.error("❌ Attachment upload error:", error);

      console.error(
        "❌ Backend attachment error:",
        JSON.stringify(error?.response?.data, null, 2),
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to upload attachment.",
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  // ========================================
  // Remove Attachment
  // ========================================

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  // ========================================
  // Send Message
  // ========================================

  const handleSubmit = async () => {
    const value = message.trim();

    // ======================================
    // Nothing To Send
    // ======================================

    if (!value && attachments.length === 0) {
      return;
    }

    if (sending || uploading) {
      return;
    }

    if (!ticketId) {
      toast.error("Ticket not found.");

      return;
    }

    if (!socket.connected) {
      toast.error("Chat connection unavailable.");

      return;
    }

    try {
      // ====================================
      // Send Through Socket
      // ====================================

      socket.emit(
        "send-message",
        {
          ticketId,

          message: value,

          attachments,
        },
        async (response) => {
          if (!response?.success) {
            toast.error(response?.message || "Unable to send message.");

            return;
          }

          console.log("✅ Message sent:", response.data);

          // ================================
          // Clear Input
          // ================================

          setMessage("");

          setAttachments([]);

          // ================================
          // Stop Typing
          // ================================

          socket.emit("typing:stop", {
            ticketId,
          });
        },
      );
    } catch (error) {
      console.error("❌ Send message error:", error);

      toast.error("Unable to send message.");
    }
  };

  // ========================================
  // Keyboard
  // ========================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSubmit();
    }
  };

  // ========================================
  // Typing
  // ========================================

  const emitTyping = () => {
    if (!ticketId) {
      return;
    }

    socket.emit("typing:start", {
      ticketId,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("typing:stop", {
        ticketId,
      });
    }, 1000);
  };

  // ========================================
  // File Icon
  // ========================================

  const renderFileIcon = (attachment) => {
    if (attachment.type?.startsWith("image/")) {
      return <Image size={18} />;
    }

    return <File size={18} />;
  };

  // ========================================
  // Render
  // ========================================

  return (
    <div className="message-input-wrapper">
      {/* ==================================
          Attachment Preview
      ================================== */}

      {attachments.length > 0 && (
        <div className="attachment-preview-list">
          {attachments.map((attachment, index) => (
            <div
              key={`${attachment.url}-${index}`}
              className="attachment-preview"
            >
              <div className="attachment-preview-icon">
                {renderFileIcon(attachment)}
              </div>

              <div className="attachment-preview-info">
                <span className="attachment-preview-name">
                  {attachment.name}
                </span>

                <span className="attachment-preview-size">
                  {(attachment.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              <button
                type="button"
                className="attachment-remove-btn"
                onClick={() => handleRemoveAttachment(index)}
                disabled={sending || uploading}
                aria-label={`Remove ${attachment.name}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ==================================
          Input
      ================================== */}

      <div className="message-input">
        {/* Hidden File Input */}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleFileSelect}
          hidden
        />

        {/* Attachment Button */}

        <button
          type="button"
          className="message-attachment-btn"
          onClick={handleAttachmentClick}
          disabled={sending || uploading || attachments.length >= MAX_FILES}
          title="Attach files"
        >
          {uploading ? (
            <span className="chat-spinner" />
          ) : (
            <Paperclip size={20} />
          )}
        </button>

        {/* Textarea */}

        <textarea
          value={message}
          placeholder={
            uploading ? "Uploading attachment..." : "Type your message..."
          }
          onChange={(event) => {
            setMessage(event.target.value);

            emitTyping();
          }}
          onKeyDown={handleKeyDown}
          disabled={sending || uploading}
          maxLength={5000}
          rows={2}
        />

        {/* Send Button */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            sending ||
            uploading ||
            (!message.trim() && attachments.length === 0)
          }
          className="message-send-btn"
        >
          {sending ? <span className="chat-spinner" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

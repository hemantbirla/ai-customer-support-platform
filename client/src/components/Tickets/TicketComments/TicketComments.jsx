import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

import TicketCommentForm from "../TicketCommentForm";
import TicketAttachments from "../TicketAttachments";

import { addComment } from "../../../services/ticket.service";

import styles from "./TicketComments.module.css";

const TicketComments = ({
  ticketId,
  comments = [],
  refreshComments,
  allowInternalNote = true,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("message", data.message);
      formData.append("isInternal", data.isInternal || false);

      if (data.attachments?.length) {
        Array.from(data.attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      await addComment(ticketId, formData);

      toast.success("Comment added successfully.");

      if (refreshComments) {
        refreshComments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>Comments</h3>

        <span className={styles.count}>{comments.length}</span>
      </div>

      <TicketCommentForm
        loading={loading}
        onSubmit={handleCommentSubmit}
        allowInternalNote={allowInternalNote}
      />

      {comments.length === 0 ? (
        <div className={styles.empty}>
          <MessageSquare size={40} />
          <p>No comments yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {comments.map((comment) => (
            <article key={comment._id} className={styles.comment}>
              <div className={styles.top}>
                <div>
                  <h4>{comment.author?.name || "Unknown User"}</h4>

                  <span>
                    {format(
                      new Date(comment.createdAt),
                      "dd MMM yyyy, hh:mm a",
                    )}
                  </span>
                </div>

                <span
                  className={
                    comment.isInternal ? styles.internal : styles.public
                  }
                >
                  {comment.isInternal ? "Internal Note" : "Public Reply"}
                </span>
              </div>

              <div className={styles.message}>{comment.message}</div>

              {comment.attachments?.length > 0 && (
                <div className={styles.attachments}>
                  <TicketAttachments attachments={comment.attachments} />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

TicketComments.propTypes = {
  ticketId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  refreshComments: PropTypes.func,
  allowInternalNote: PropTypes.bool,
};

export default TicketComments;

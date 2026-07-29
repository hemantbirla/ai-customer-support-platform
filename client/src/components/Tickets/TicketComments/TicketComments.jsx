import PropTypes from "prop-types";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";

import TicketCommentForm from "../TicketCommentForm";
import TicketAttachments from "../TicketAttachments";

import styles from "./TicketComments.module.css";

const TicketComments = ({ ticketId, comments = [], refreshComments }) => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>Comments</h3>

        <span className={styles.count}>{comments.length}</span>
      </div>

      <TicketCommentForm ticketId={ticketId} onSuccess={refreshComments} />

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
};

export default TicketComments;

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import PageLoader from "../../../components/common/PageLoader/PageLoader";
import EmptyState from "../../../components/Common/EmptyState/EmptyState";

import TicketInfo from "../../../components/Tickets/TicketInfo";
import CustomerInfo from "../../../components/Tickets/CustomerInfo";
import TicketStatusCard from "../../../components/Tickets/TicketStatusCard";
import TicketAttachments from "../../../components/Tickets/TicketAttachments";
import TicketComments from "../../../components/Tickets/TicketComments";
import TicketTimeline from "../../../components/Tickets/TicketTimeline";
import ActivityLog from "../../../components/Tickets/ActivityLog";

import {
  getTicketById,
  getComments,
  getActivityLogs,
} from "../../../services/ticket.service";

import styles from "./TicketDetails.module.css";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const [comments, setComments] = useState([]);

  const [activityLogs, setActivityLogs] = useState([]);

  const [error, setError] = useState("");

  const fetchTicketDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [ticketRes, commentsRes, activityRes] = await Promise.all([
        getTicketById(ticketId),
        getComments(ticketId),
        getActivityLogs(ticketId),
      ]);

      const ticketData = ticketRes.data.data;

      setTicket(ticketData.ticket);
      setAttachments(ticketData.attachments || []);

      setComments(commentsRes.data.data || []);
      setActivityLogs(activityRes.data.data || []);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load ticket details.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicketDetails();
  }, [fetchTicketDetails]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <EmptyState title="Unable to load ticket" description={error} />;
  }

  if (!ticket) {
    return (
      <EmptyState
        title="Ticket not found"
        description="The requested ticket does not exist."
      />
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div className={styles.grid}>
        <div className={styles.left}>
          <TicketInfo ticket={ticket} />

          <div className={styles.section}>
            <CustomerInfo customer={ticket.customer} />
          </div>

          <TicketAttachments attachments={attachments} />

          <TicketComments
            ticketId={ticketId}
            comments={comments}
            refreshComments={fetchTicketDetails}
          />
        </div>

        <div className={styles.right}>
          <TicketStatusCard
            ticket={ticket}
            refreshTicket={fetchTicketDetails}
          />

          <TicketTimeline activities={activityLogs} />

          <ActivityLog logs={activityLogs} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

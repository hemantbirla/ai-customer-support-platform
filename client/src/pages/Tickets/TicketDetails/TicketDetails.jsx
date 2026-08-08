import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import PageLoader from "../../../components/common/PageLoader/PageLoader";
import EmptyState from "../../../components/Common/EmptyState/EmptyState";

import TicketInfo from "../../../components/Tickets/TicketInfo";
import CustomerInfo from "../../../components/Tickets/CustomerInfo";
import TicketStatusCard from "../../../components/Tickets/TicketStatusCard";
import TicketAttachments from "../../../components/Tickets/TicketAttachments";
import TicketComments from "../../../components/Tickets/TicketComments";
import TicketTimeline from "../../../components/Tickets/TicketTimeline";
import ActivityLog from "../../../components/Tickets/ActivityLog";

import StatusDropdown from "../../../components/Tickets/StatusDropdown";
import useTicketPermissions from "../../../hooks/useTicketPermissions";

import {
  getTicketById,
  getComments,
  getActivityLogs,
  updateTicketStatus,
  assignAgent,
} from "../../../services/ticket.service";

import styles from "./TicketDetails.module.css";
import AssignAgentModal from "../../../components/Tickets/AssignAgentModal/AssignAgentModal";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [error, setError] = useState("");
  const { canChangeStatus, allowedTransitions } = useTicketPermissions(ticket);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [agents, setAgents] = useState([]);

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
      setComments(commentsRes.data.data.comments || []);
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

  // ==========================================
  // Update Ticket Status
  // ==========================================

  const handleStatusChange = async (status) => {
    try {
      await updateTicketStatus(ticketId, status);

      toast.success("Ticket status updated successfully.");

      fetchTicketDetails();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update ticket status.",
      );
    }
  };

  const handleAssignClick = () => {
    setShowAssignModal(true);
  };

  const handleAssignAgent = async (agentId) => {
    try {
      setAssignLoading(true);

      await assignAgent(ticket._id, agentId);

      toast.success("Agent assigned successfully.");

      setShowAssignModal(false);

      fetchTicketDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to assign agent.");
    } finally {
      setAssignLoading(false);
    }
  };

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
      <div className={styles.pageActions}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>

        <Link to={`/tickets/${ticket._id}/chat`} className={styles.chatButton}>
          <MessageCircle size={18} />
          Open Chat
        </Link>
      </div>

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
          <TicketStatusCard ticket={ticket} onRefresh={fetchTicketDetails} />

          {canChangeStatus && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Change Status</h3>

              <StatusDropdown
                currentStatus={ticket.status}
                options={allowedTransitions}
                onChange={handleStatusChange}
              />
            </div>
          )}

          <TicketTimeline activities={activityLogs} />
          <AssignAgentModal
            open={showAssignModal}
            loading={assignLoading}
            agents={agents}
            currentAgent={ticket.assignedAgent?._id}
            onAssign={handleAssignAgent}
            onClose={() => setShowAssignModal(false)}
          />

          <ActivityLog logs={activityLogs} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

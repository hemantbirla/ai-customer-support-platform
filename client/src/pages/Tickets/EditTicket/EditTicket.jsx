import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import TicketForm from "../../../components/Tickets/TicketForm";
import styles from "./EditTicket.module.css";

import { getTicketById, updateTicket } from "../../../services/ticket.service";

const EditTicket = () => {
  const { ticketId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const loadTicket = async () => {
    try {
      setLoading(true);

      const response = await getTicketById(ticketId);

      setTicket(response.data.data.ticket);
    } catch (error) {
      toast.error("Unable to load ticket.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicket = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("subject", data.subject);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("priority", data.priority);

      (data.attachments || []).forEach((file) => {
        formData.append("attachments", file);
      });

      await updateTicket(ticketId, formData);

      toast.success("Ticket updated successfully.");

      navigate(`/tickets/${ticketId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update ticket.");
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) return null;

  return (
    <TicketForm
      mode="edit"
      initialValues={ticket}
      loading={loading}
      onSubmit={handleUpdateTicket}
      onCancel={() => navigate(`/tickets/${ticketId}`)}
    />
  );
};

export default EditTicket;

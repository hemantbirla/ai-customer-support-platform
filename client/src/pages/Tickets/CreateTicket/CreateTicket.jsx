import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TicketForm from "../../../components/Tickets/TicketForm";
import styles from "./CreateTicket.module.css";
import { createTicket } from "../../../services/ticket.service";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateTicket = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("subject", data.subject);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("priority", data.priority);

      Array.from(data.attachments || []).forEach((file) => {
        formData.append("attachments", file);
      });

      await createTicket(formData);

      toast.success("Ticket created successfully!");
      navigate("/tickets");
    } catch (error) {
      console.error("Failed to create ticket:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create ticket. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate("/tickets")}
          >
            &larr; Back to Tickets
          </button>
          <h1 className={styles.title}>Create New Ticket</h1>
          <p className={styles.subtitle}>
            Fill out the form below to submit a support request.
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <TicketForm
          mode="create"
          loading={loading}
          onSubmit={handleCreateTicket}
          onCancel={() => navigate("/tickets")}
        />
      </div>
    </div>
  );
};

export default CreateTicket;

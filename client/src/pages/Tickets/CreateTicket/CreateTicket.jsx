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
    const formData = new FormData();

    formData.append("subject", data.subject);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("priority", data.priority);

    Array.from(data.attachments || []).forEach((file) => {
      formData.append("attachments", file);
    });

    await createTicket(formData);
  };

  return (
    <TicketForm
      mode="create"
      loading={loading}
      onSubmit={handleCreateTicket}
      onCancel={() => navigate("/tickets")}
    />
  );
};

export default CreateTicket;

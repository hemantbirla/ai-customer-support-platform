import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../../hooks/useAuth";

import TicketHeader from "../../../components/Tickets/TicketHeader";
import TicketSearch from "../../../components/Tickets/TicketSearch";
import TicketFilters from "../../../components/Tickets/TicketFilters";
import TicketTable from "../../../components/Tickets/TicketTable";
import AssignAgentModal from "../../../components/Tickets/AssignAgentModal";

import PageLoader from "../../../components/common/PageLoader/PageLoader";
import EmptyState from "../../../components/Common/EmptyState/EmptyState";
import Pagination from "../../../components/Common/Pagination/Pagination";

import {
  getTickets,
  deleteTicket,
  assignAgent,
} from "../../../services/ticket.service";
import { getUsers } from "../../../services/auth.service";

import { DEFAULT_TICKET_FILTERS } from "../../../constants/ticket.constants";

import styles from "./TicketList.module.css";

const TicketList = () => {
  // ==========================
  // State
  // ==========================

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState(DEFAULT_TICKET_FILTERS);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Assign Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTicketForAssign, setSelectedTicketForAssign] = useState(null);
  const [agents, setAgents] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // ==========================
  // Navigation
  // ==========================

  const handleCreateTicket = () => {
    navigate("/tickets/new");
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const handleEditTicket = (ticketId) => {
    navigate(`/tickets/${ticketId}/edit`);
  };

  // ==========================
  // Fetch Tickets
  // ==========================

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTickets(filters);
      const result = response.data.data;

      setTickets(result.tickets || []);
      setPagination({
        page: result.page || 1,
        totalPages: result.totalPages || 1,
        totalItems: result.totalItems || 0,
      });
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch tickets";

      setError(message);
      setTickets([]);
      setPagination({
        page: 1,
        totalPages: 1,
        totalItems: 0,
      });

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // ==========================
  // Fetch Agents for Modal
  // ==========================
  const loadAgents = async () => {
    try {
      const response = await getUsers({
        role: "AGENT",
      });
      console.log("Users API:", response);
      setAgents(response.data);
    } catch (err) {
      toast.error("Failed to load agents");
    }
  };

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    fetchTickets();
    loadAgents();
  }, [fetchTickets]);

  // ==========================
  // Search
  // ==========================

  const handleSearch = useCallback((search) => {
    setFilters((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  }, []);

  // ==========================
  // Filters
  // ==========================

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  }, []);

  // ==========================
  // Pagination
  // ==========================

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  // ==========================
  // Sorting
  // ==========================

  const handleSortChange = useCallback((sort) => {
    setFilters((prev) => ({
      ...prev,
      sort,
      page: 1,
    }));
  }, []);

  // ==========================
  // Delete Ticket
  // ==========================

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      toast.success("Ticket deleted successfully");
      fetchTickets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete ticket");
    }
  };

  // ==========================
  // Assign Handlers
  // ==========================

  const handleOpenAssignModal = (ticket) => {
    setSelectedTicketForAssign(ticket);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setSelectedTicketForAssign(null);
    setIsAssignModalOpen(false);
  };

  const handleConfirmAssign = async (agentId) => {
    if (!selectedTicketForAssign) return;

    try {
      setAssignLoading(true);
      await assignAgent(selectedTicketForAssign._id, agentId);

      toast.success("Agent assigned successfully");
      handleCloseAssignModal();
      fetchTickets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign agent");
    } finally {
      setAssignLoading(false);
    }
  };

  const handleReopen = (ticket) => {
    console.log("Reopen", ticket);
  };

  // ==========================
  // Active Filters Check
  // ==========================

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "" ||
    filters.priority !== "" ||
    filters.category !== "" ||
    filters.assignedAgent !== "";

  // ==========================
  // Render
  // ==========================

  return (
    <div className={styles.container}>
      <TicketHeader
        onCreate={handleCreateTicket}
        showCreateButton={user?.role?.toUpperCase() !== "AGENT"}
      />

      <TicketSearch value={filters.search} onSearch={handleSearch} />

      <TicketFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        agents={agents}
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState title="Error" description={error} />
      ) : tickets.length === 0 ? (
        <EmptyState
          message={
            hasActiveFilters
              ? "No tickets found for the selected filters."
              : "No tickets available."
          }
        />
      ) : (
        <TicketTable
          tickets={tickets}
          role={user?.role}
          onView={handleViewTicket}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
          onAssign={handleOpenAssignModal}
          onReopen={handleReopen}
        />
      )}

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPageChange={handlePageChange}
      />

      {/* Assign Agent Modal */}
      {/* Assign Agent Modal */}
      <AssignAgentModal
        open={isAssignModalOpen}
        loading={assignLoading}
        agents={agents}
        currentAgent={selectedTicketForAssign?.assignedAgent?._id || ""}
        onAssign={handleConfirmAssign}
        onClose={handleCloseAssignModal}
      />
    </div>
  );
};

export default TicketList;

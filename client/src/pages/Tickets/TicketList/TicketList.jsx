import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TicketHeader from "../../../components/Tickets/TicketHeader";
import TicketSearch from "../../../components/Tickets/TicketSearch";
import TicketFilters from "../../../components/Tickets/TicketFilters";
import TicketTable from "../../../components/Tickets/TicketTable";

import PageLoader from "../../../components/common/PageLoader/PageLoader";
import EmptyState from "../../../components/Common/EmptyState/EmptyState";
import Pagination from "../../../components/Common/Pagination/Pagination";

import { getTickets, deleteTicket } from "../../../services/ticket.service";

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
  // Initial Load
  // ==========================

  useEffect(() => {
    fetchTickets();
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
      <TicketHeader onCreate={handleCreateTicket} />

      <TicketSearch value={filters.search} onSearch={handleSearch} />

      <TicketFilters filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState message={error} />
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
          onView={handleViewTicket}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
          onSort={handleSortChange}
        />
      )}

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TicketList;

import { recentTickets } from "../../../data/dashboardData";
import Badge from "../../common/Badge/Badge";
import "./RecentTickets.css";

const RecentTickets = () => {
  return (
    <section className="recent-tickets">
      <h2 className="recent-tickets__title">Recent Tickets</h2>

      <div className="recent-tickets__table-wrapper">
        <table className="recent-tickets__table">
          <thead>
            <tr>
              <th>Ticket ID</th>

              <th>Subject</th>

              <th>Status</th>

              <th>Priority</th>

              <th>Created</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {recentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>

                <td>{ticket.subject}</td>

                <td>
                  <Badge type={ticket.status.toLowerCase()}>
                    {ticket.status}
                  </Badge>
                </td>

                <td>
                  <Badge type={ticket.priority.toLowerCase()}>
                    {ticket.priority}
                  </Badge>
                </td>

                <td>{ticket.createdAt}</td>

                <td>
                  <button className="view-ticket-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentTickets;

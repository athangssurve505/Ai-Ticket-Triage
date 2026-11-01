import Icon from "../../shared/Components/Icon";
import "./ticketcard.css";

const TicketCard = ({ ticket, selected, onClick }) => {
  return (
    <div
      className={`ticket-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className={`ticket-icon ${ticket.iconColor}`}>
        <Icon name={ticket.icon} size={27} />
      </div>

      <div className="ticket-info">
        <h3>{ticket.title}</h3>

        <div className="ticket-meta">
          <span>#{ticket.ticketId}</span>
          <span className="meta-dot">•</span>
          <span>{ticket.date}</span>
        </div>
      </div>

      <div className="ticket-badges">
        <span className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
          <span className="badge-dot"></span>
          {ticket.status}
        </span>

        <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
          <Icon name={ticket.priorityIcon} size={16} />
          {ticket.priority}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
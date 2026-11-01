import { useState } from "react";

import NewTicketModal from "../../Components/TicketCard/NewTicketModal";
import Button from "../../shared/Components/Button"
import TicketCard from "../../Components/TicketCard"

import "./ticketpanel.css";


const TicketsPanel = ({
  tickets,
  selectedTicket,
  onSelectTicket,
  loading,
  onTicketCreated,
}) => {

  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  return (
    <section className="tickets-panel">

      <div className="tickets-header">
        <div className="tickets-heading">
          <h2>Tickets</h2>
          <p>Manage and analyze customer support tickets</p>
        </div>

        <Button icon="RiAddLine"   onClick={() => setShowNewTicketModal(true)}>
          New Ticket
        </Button>
      </div>

      {showNewTicketModal && (
   <NewTicketModal
    onClose={() => setShowNewTicketModal(false)}
    onTicketCreated={onTicketCreated}
   />
    )}
      <div className="tickets-list">

        {loading && <p>Loading tickets...</p>}

        {!loading && tickets.length === 0 && (
          <p>No tickets found.</p>
        )}

        {!loading && tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={{
              ...ticket,
              ticketId: `TK-${ticket._id.slice(-6).toUpperCase()}`,
              date: new Date(ticket.createdAt).toLocaleDateString("en-GB"),
              icon: "RiTicket2Line",
              iconColor: "purple",
              priorityIcon: "RiArrowUpLine",
            }}
            selected={selectedTicket?._id === ticket._id}
            onClick={() => onSelectTicket(ticket)}
          />
        ))}

      </div>
    </section>
  );
};

export default TicketsPanel
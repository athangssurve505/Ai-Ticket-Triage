import { useEffect, useState } from "react";
import Navbar from "./Layouts/Navbar"
import TicketsPanel from "./Layouts/TicketPanel";
import TicketDetails from "./Layouts/TicketDetails";

import api from "./services/api";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const response = await api.get("/ticket");

      const ticketData = response.data.data;

      setTickets(ticketData);

      if (ticketData.length > 0) {
        setSelectedTicket(ticketData[0]);
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketUpdated = (updatedTicket) => {
  setTickets((prevTickets) =>
    prevTickets.map((item) =>
      item._id === updatedTicket._id ? updatedTicket : item
    )
  );

  setSelectedTicket(updatedTicket);
};

const handleTicketDeleted = (deletedTicketId) => {
  const updatedTickets = tickets.filter(
    (item) => item._id !== deletedTicketId
  );

  setTickets(updatedTickets);
  setSelectedTicket(updatedTickets[0] || null);
};
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-layout">

        <TicketsPanel
          tickets={tickets}
          selectedTicket={selectedTicket}
          onSelectTicket={setSelectedTicket}
          loading={loading}
        />

    <TicketDetails
  ticket={selectedTicket}
  onTicketUpdated={handleTicketUpdated}
  onTicketDeleted={handleTicketDeleted}
/>
      </main>
    </div>
  );
}

export default App;
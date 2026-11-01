import { useState } from "react";

import Button from "../../shared/Components/Button";
import api from "../../services/api";

import "./ticketdetails.css";

const TicketDetails = ({ ticket, onTicketUpdated, onTicketDeleted }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!ticket) {
    return (
      <section className="ticket-details">
        <h2>Select a ticket</h2>
        <p>Choose a ticket to view its details and AI analysis.</p>
      </section>
    );
  }

  // Handle AI Analysis
  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError("");

      const response = await api.post(
        `/ai/analyze/${ticket._id}`
      );

      const updatedTicket = response.data.data;

      onTicketUpdated(updatedTicket);

    } catch (err) {
      console.error("AI Analysis Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to analyze ticket. Please try again."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle Ticket Deletion
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await api.delete(`/ticket/${ticket._id}`);

      onTicketDeleted(ticket._id);

    } catch (err) {
      console.error("Delete Ticket Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to delete ticket. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="ticket-details">

      {/* Ticket Information */}
      <div className="ticket-details-header">
        <h2>{ticket.title}</h2>

        <Button
          icon="RiDeleteBinLine"
          variant="danger"
          onClick={handleDelete}
          disabled={deleting || analyzing}
        >
          {deleting ? "Deleting..." : "Delete Ticket"}
        </Button>
      </div>

      <p>{ticket.description}</p>

      <div className="ticket-detail-meta">
        <span>Status: {ticket.status}</span>
        <span>Priority: {ticket.priority}</span>
      </div>

      <hr />

      {/* AI Analysis */}
      <h3>AI Analysis</h3>

      {ticket.isAnalyzed ? (

        <div className="ai-result">
          <p>
            <strong>Category:</strong>{" "}
            {ticket.aiAnalysis?.category}
          </p>

          <p>
            <strong>AI Priority:</strong>{" "}
            {ticket.aiAnalysis?.priority}
          </p>

          <p>
            <strong>Sentiment:</strong>{" "}
            {ticket.aiAnalysis?.sentiment}
          </p>

          <p>
            <strong>Reasoning:</strong>{" "}
            {ticket.aiAnalysis?.reasoning}
          </p>

          <div className="suggested-response">
            <h4>Suggested Response</h4>

            <p>
              {ticket.aiAnalysis?.suggestedResponse}
            </p>
          </div>
        </div>

      ) : (

        <div className="analysis-empty">
          <p>This ticket has not been analyzed yet.</p>

          <Button
            icon="RiSparkling2Line"
            onClick={handleAnalyze}
            disabled={analyzing || deleting}
          >
            {analyzing ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </div>

      )}

      {error && (
        <p className="analysis-error">{error}</p>
      )}

    </section>
  );
};

export default TicketDetails;
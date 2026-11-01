import { useState } from "react";

import Button from "../../../shared/Components/Button";
import api from "../../../services/api";
import "./newticketmodal.css";

const NewTicketModal = ({ onClose, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const response = await api.post("/ticket", formData);

      const newTicket = response.data.data;

      onTicketCreated(newTicket);
      onClose();

    } catch (err) {
      console.error("Create Ticket Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to create ticket. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="ticket-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Create New Ticket</h2>
            <p>Describe the customer's issue below.</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            disabled={submitting}
            type="button"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Ticket Title</label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Payment not reflecting in account"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={120}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Explain the customer's issue in detail..."
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              maxLength={3000}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              icon="RiAddLine"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicketModal;
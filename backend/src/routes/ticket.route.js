import express from "express";

import {
    getAllTickets,
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket
} from "../controllers/ticket.controller.js";

export const ticketRouter = express.Router();

// GET all tickets
ticketRouter.get("/", getAllTickets);

// POST create a new ticket
ticketRouter.post("/", createTicket);

// GET a specific ticket by ID
ticketRouter.get("/:id", getTicketById);

// PATCH update a ticket
ticketRouter.patch("/:id", updateTicket);

// DELETE a ticket
ticketRouter.delete("/:id", deleteTicket);
import mongoose from "mongoose";
import ticketModel from "../model/ticket.model.js"
import { analyzeTicket } from "../services/ai.service.js";

export async function analyzeTicketController(req, res) {
    try {
        const { ticketId } = req.params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ticket ID"
            });
        }

        // Find ticket in MongoDB
        const ticket = await ticketModel.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }
                if (ticket.isAnalyzed) {
              return res.status(409).json({
        success: false,
        message: "This ticket has already been analyzed"
        });
        }   

        // Send ticket information to AI service
        const aiResult = await analyzeTicket(
            ticket.title,
            ticket.description
        );

        // Save AI analysis in the ticket
        ticket.aiAnalysis = {
            ...aiResult,
            
            analyzedAt: new Date()
        };

        ticket.isAnalyzed = true;

        await ticket.save();

        return res.status(200).json({
            success: true,
            message: "Ticket analyzed successfully",
            data: ticket
        });

    } catch (error) {
        console.error("Ticket Analysis Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to analyze ticket"
        });
    }
}
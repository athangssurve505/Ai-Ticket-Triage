import express from "express";
import { analyzeTicketController } from "../controllers/ai.controller.js";


export const aiRouter = express.Router();

aiRouter.post("/analyze/:ticketId", analyzeTicketController);
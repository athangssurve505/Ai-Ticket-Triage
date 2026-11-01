import express from "express";
import { ticketRouter } from "./routes/ticket.route.js";
import { aiRouter } from "./routes/ai.route.js";
import cors from "cors";


const app = express();

app.use(cors({
    origin: "https://ai-ticket-triage-seven.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use("/api/ticket", ticketRouter);
app.use("/api/ai", aiRouter);

app.get("/",(req,res)=>{
    res.send("API is running ");
})

export default app;
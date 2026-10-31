import ticketModel from "../model/ticket.model.js";


export async function getAllTickets(req,res){
    const tickets = await ticketModel.find();

    if(tickets.length === 0){
        return res.status(404).json({
            message:"No tickets present"
        })
  
    }

     return res.status(200).json({
            message:"All tickets Fetched Successfully",
            data:tickets
        })
}


export async function createTicket(req, res) {
    try {
        const { title, description, priority, status } = req.body;

        const ticket = await ticketModel.create({
            title,
            description,
            priority,
            status
        });

        return res.status(201).json({
            message: "Ticket created successfully",
            success: true,
            data: ticket
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create ticket",
            success: false,
            error: error.message
        });
    }
}


export async function getTicketById(req, res) {
    try {
        const { id } = req.params;
        

        const ticket = await ticketModel.findById(id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket fetched successfully",
            data: ticket,
            // req
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch ticket",
            error: error.message
        });
    }
}


export async function updateTicket(req, res) {
    try {
        const { id } = req.params;

        const updatedTicket = await ticketModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTicket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            data: updatedTicket
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update ticket",
            error: error.message
        });
    }
}


export async function deleteTicket(req, res) {
    try {
        const { id } = req.params;

        const deletedTicket = await ticketModel.findByIdAndDelete(id);

        if (!deletedTicket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ticket deleted successfully",
            data: deletedTicket
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete ticket",
            error: error.message
        });
    }
}
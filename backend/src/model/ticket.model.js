import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high","urgent"],
    default: "medium"
  },

  status: {
    type: String,
    enum: ["open", "in-progress", "resolved"],
    default: "open"
  },
  isAnalyzed: {
    type: Boolean,
    default: false
},
  aiAnalysis: {
    category: {
        type: String,
        enum: ["Technical", "Billing", "Account", "Other"]
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Urgent"]
    },
    sentiment: {
        type: String,
        enum: ["Positive", "Neutral", "Negative"]
    },
    reasoning: {
        type: String
    },
    suggestedResponse: {
        type: String
    },
    analyzedAt: {
        type: Date
    }
}
});

// Create the model using the schema
const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel

import groq from "../config/groq.js";

export async function analyzeTicket(title, description) {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
                        You are a professional customer support ticket analyst.

                        Analyze customer support tickets and return structured JSON.

                        Follow these classification rules:

                        Category:
                        - Technical
                        - Billing
                        - Account
                        - Other

                        Priority:
                        - Low
                        - Medium
                        - High
                        - Urgent

                        Sentiment:
                        - Positive
                        - Neutral
                        - Negative

                        Important rules:
                        1. Determine priority using business impact and urgency.
                        2. Do not determine priority using sentiment alone.
                        3. Do not invent facts, actions, refunds or resolution timelines.
                        4. Suggested responses must be professional and empathetic.
                        5. Return only valid JSON.

                        Required JSON structure:
                        {
                            "category": "Billing",
                            "priority": "High",
                            "sentiment": "Negative",
                            "reasoning": "Explanation of classification",
                            "suggestedResponse": "Professional response to customer"
                        }
                            IMPORTANT RULES FOR SUGGESTED RESPONSE:

1. Never invent application features, buttons,
   menus, navigation paths, or settings.

2. Only provide step-by-step instructions if
   the exact procedure is provided in the ticket
   context or available knowledge base.

3. If the required information is unavailable,
   politely acknowledge the issue and ask the
   customer for additional details.

4. Never claim that an action has been completed.

5. Do not promise refunds, account changes,
   or resolution timelines without authorization.

6. Keep responses professional, concise,
   empathetic, and easy to understand.
                    `,
        },
        {
          role: "user",
          content: `
                        Analyze this support ticket:

                        Title: ${title}

                        Description: ${description}
                    `,
        },
      ],

      response_format: {
        type: "json_object",
      },
    });

    const aiResult = JSON.parse(response.choices[0].message.content);

    const validatedResult = validateAIResponse(aiResult);

    return validatedResult;
  } catch (error) {
    console.error("AI Analysis Error:", error.message);

    throw new Error("Failed to analyze support ticket");
  }
}

function validateAIResponse(data) {
  const allowedCategories = ["Technical", "Billing", "Account", "Other"];

  const allowedPriorities = ["Low", "Medium", "High", "Urgent"];

  const allowedSentiments = ["Positive", "Neutral", "Negative"];

  // Check whether response is an object
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("AI returned an invalid response object");
  }

  // Check category
  if (!allowedCategories.includes(data.category)) {
    throw new Error("Invalid AI category");
  }

  // Check priority
  if (!allowedPriorities.includes(data.priority)) {
    throw new Error("Invalid AI priority");
  }

  // Check sentiment
  if (!allowedSentiments.includes(data.sentiment)) {
    throw new Error("Invalid AI sentiment");
  }

  // Check required text fields
  if (typeof data.reasoning !== "string" || !data.reasoning.trim()) {
    throw new Error("Invalid AI reasoning");
  }

  if (
    typeof data.suggestedResponse !== "string" ||
    !data.suggestedResponse.trim()
  ) {
    throw new Error("Invalid AI suggested response");
  }

  return data;
}

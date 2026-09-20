// server/src/ai/services/ai.service.js

const aiService = {
  async generateTicketSummary(_ticket) {
    throw new Error("AI ticket summary is not implemented yet.");
  },

  async generateReplySuggestion(_ticket, _conversation) {
    throw new Error("AI reply suggestion is not implemented yet.");
  },

  async detectCategory(_ticket) {
    throw new Error("AI category detection is not implemented yet.");
  },

  async detectPriority(_ticket) {
    throw new Error("AI priority detection is not implemented yet.");
  },

  async analyzeSentiment(_ticket) {
    throw new Error("AI sentiment analysis is not implemented yet.");
  },

  async generateTags(_ticket) {
    throw new Error("AI tag generation is not implemented yet.");
  },
};

export default aiService;

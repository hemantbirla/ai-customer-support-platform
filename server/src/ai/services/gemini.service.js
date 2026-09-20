import AIProvider from "./ai.provider.js";

class GeminiProvider extends AIProvider {
  constructor() {
    super();

    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = process.env.AI_MODEL || "gemini-2.5-flash";
  }

  async generateText(_prompt, _options = {}) {
    throw new Error("Gemini provider API integration is not implemented yet.");
  }
}

export default GeminiProvider;

import { GoogleGenAI } from "@google/genai";
import AIProvider from "./ai.provider.js";

class GeminiProvider extends AIProvider {
  constructor() {
    super();

    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = process.env.AI_MODEL || "gemini-2.5-flash";

    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    this.client = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  async generateText(prompt, options = {}) {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("AI prompt must be a non-empty string.");
    }

    const { temperature = 0.2, maxOutputTokens = 1000 } = options;

    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          temperature,
          maxOutputTokens,
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      return {
        text,
        model: this.model,
        provider: "GEMINI",
      };
    } catch (error) {
      console.error("Gemini API error:", error);

      throw new Error("AI provider request failed.");
    }
  }
}

export default GeminiProvider;

import GeminiProvider from "./gemini.service.js";

const providers = {
  GEMINI: GeminiProvider,
};

const getAIProvider = (providerName = "GEMINI") => {
  const Provider = providers[providerName];

  if (!Provider) {
    throw new Error(`Unsupported AI provider: ${providerName}`);
  }

  return new Provider();
};

export default getAIProvider;

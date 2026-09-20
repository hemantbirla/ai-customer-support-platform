import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  SENTIMENTS,
  MAX_AI_TAGS,
} from "../constants/ai.constants.js";

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const parseJSON = (response) => {
  if (!response) {
    throw new Error("AI response is empty.");
  }

  if (typeof response === "object") {
    return response;
  }

  if (typeof response !== "string") {
    throw new Error("AI response must be a string or object.");
  }

  let cleanedResponse = response.trim();

  // Remove markdown JSON fences if Gemini returns them.
  cleanedResponse = cleanedResponse
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch {
    throw new Error("AI response contains invalid JSON.");
  }
};

const validateConfidence = (confidence) => {
  if (
    typeof confidence !== "number" ||
    Number.isNaN(confidence) ||
    confidence < 0 ||
    confidence > 1
  ) {
    throw new Error("AI confidence must be a number between 0 and 1.");
  }
};

const validateSummary = (data) => {
  if (typeof data.summary !== "string" || !data.summary.trim()) {
    throw new Error("AI summary is required.");
  }

  if (!Array.isArray(data.keyPoints)) {
    throw new Error("AI summary keyPoints must be an array.");
  }

  if (typeof data.customerIntent !== "string" || !data.customerIntent.trim()) {
    throw new Error("AI customerIntent is required.");
  }

  return {
    summary: data.summary.trim(),
    keyPoints: data.keyPoints
      .filter((point) => typeof point === "string")
      .map((point) => point.trim())
      .filter(Boolean),
    customerIntent: data.customerIntent.trim(),
  };
};

const validateReply = (data) => {
  if (typeof data.reply !== "string" || !data.reply.trim()) {
    throw new Error("AI reply is required.");
  }

  return {
    reply: data.reply.trim(),
  };
};

const validateCategory = (data) => {
  if (!TICKET_CATEGORIES.includes(data.category)) {
    throw new Error("AI returned an invalid ticket category.");
  }

  validateConfidence(data.confidence);

  return {
    category: data.category,
    confidence: data.confidence,
  };
};

const validatePriority = (data) => {
  if (!TICKET_PRIORITIES.includes(data.priority)) {
    throw new Error("AI returned an invalid ticket priority.");
  }

  validateConfidence(data.confidence);

  return {
    priority: data.priority,
    confidence: data.confidence,
  };
};

const validateSentiment = (data) => {
  if (!SENTIMENTS.includes(data.sentiment)) {
    throw new Error("AI returned an invalid sentiment.");
  }

  validateConfidence(data.confidence);

  return {
    sentiment: data.sentiment,
    confidence: data.confidence,
  };
};

const validateTags = (data) => {
  if (!Array.isArray(data.tags)) {
    throw new Error("AI tags must be an array.");
  }

  if (data.tags.length > MAX_AI_TAGS) {
    throw new Error(`AI returned more than ${MAX_AI_TAGS} tags.`);
  }

  const tags = data.tags
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  const uniqueTags = [...new Set(tags)];

  if (uniqueTags.length !== tags.length) {
    throw new Error("AI returned duplicate tags.");
  }

  return {
    tags: uniqueTags,
  };
};

export const parseAIResponse = (response) => {
  const data = parseJSON(response);

  if (!isPlainObject(data)) {
    throw new Error("AI response must be a JSON object.");
  }

  return data;
};

export const parseSummaryResponse = (response) => {
  const data = parseAIResponse(response);

  return validateSummary(data);
};

export const parseReplyResponse = (response) => {
  const data = parseAIResponse(response);

  return validateReply(data);
};

export const parseCategoryResponse = (response) => {
  const data = parseAIResponse(response);

  return validateCategory(data);
};

export const parsePriorityResponse = (response) => {
  const data = parseAIResponse(response);

  return validatePriority(data);
};

export const parseSentimentResponse = (response) => {
  const data = parseAIResponse(response);

  return validateSentiment(data);
};

export const parseTagsResponse = (response) => {
  const data = parseAIResponse(response);

  return validateTags(data);
};

export const errorHandler = (err, req, res, next) => {
  // Fallback status code and message if it's not a custom ApiError
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // 💡 FIX: Ensure you are sending JSON, not letting Express send HTML
  return res.status(statusCode).json({
    success: false,
    message: message,
    // Optional: Only show stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

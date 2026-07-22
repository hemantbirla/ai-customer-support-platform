export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong on the server";

  console.error(
    `[Error] ${req.method} ${req.url} >> Status: ${statusCode} | Message: ${message}`,
  );

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;

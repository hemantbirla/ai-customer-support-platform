export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Something went wrong on the server";
  let errors = err.errors || [];

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  console.error(
    `[Error] ${req.method} ${req.originalUrl} >> Status: ${statusCode} | Message: ${message}`,
  );

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;

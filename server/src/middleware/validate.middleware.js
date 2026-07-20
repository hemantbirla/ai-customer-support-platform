export const validate = (schema) => (req, res, next) => {
  // Pass the whole req object instead of just req.body
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // 💡 FIX: Extract data from the schema's 'body' key back into req.body
  req.body = result.data.body;
  next();
};

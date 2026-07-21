import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    // If you pass this to next(), your global errorHandler will format it cleanly!
    return next(
      new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Validation failed",
        formattedErrors,
      ),
    );
  }

  // 💡 FIX: Reassign req.body safely, but mutate req.query and req.params in place
  if (result.data.body) {
    req.body = result.data.body;
  }

  if (result.data.query) {
    Object.assign(req.query, result.data.query);
  }

  if (result.data.params) {
    Object.assign(req.params, result.data.params);
  }

  next();
};

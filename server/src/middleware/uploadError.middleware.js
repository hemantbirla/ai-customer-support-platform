import multer from "multer";

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message: "Each file must be less than 10 MB",
        });

      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          success: false,
          message: "Maximum 5 files are allowed",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  if (err.message === "Only PDF, DOCX, PNG and JPG files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next(err);
};

export default uploadErrorHandler;

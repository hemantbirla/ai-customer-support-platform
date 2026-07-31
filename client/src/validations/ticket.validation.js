import * as yup from "yup";

import {
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
} from "../constants/ticket.constants";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 5;

export const ticketValidationSchema = yup.object({
  subject: yup
    .string()
    .trim()
    .required("Subject is required.")
    .min(5, "Subject must be at least 5 characters.")
    .max(150, "Subject cannot exceed 150 characters."),

  description: yup
    .string()
    .trim()
    .required("Description is required.")
    .min(20, "Description must be at least 20 characters."),

  category: yup
    .string()
    .required("Category is required.")
    .oneOf(CATEGORY_OPTIONS, "Invalid category."),

  priority: yup
    .string()
    .required("Priority is required.")
    .oneOf(PRIORITY_OPTIONS, "Invalid priority."),

  attachments: yup
    .mixed()
    .test("maxFiles", `Maximum ${MAX_FILES} files are allowed.`, (files) => {
      if (!files || files.length === 0) return true;
      return files.length <= MAX_FILES;
    })
    .test(
      "fileSize",
      `Each file must be smaller than ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
      (files) => {
        if (!files || files.length === 0) return true;

        return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
      },
    ),
});

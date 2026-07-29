import { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Select from "../../Common/Select";
import FileUpload from "../../Common/FileUpload";

import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
} from "../../../constants/ticket.constants";

import { ticketValidationSchema } from "../../../validations/ticket.validation";

import styles from "./TicketForm.module.css";

const defaultValues = {
  subject: "",
  description: "",
  category: "",
  priority: "",
  attachments: [],
};

const TicketForm = ({
  mode = "create",
  initialValues = {},
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketValidationSchema),
    defaultValues,
  });

  // ==========================================
  // Populate Edit Form
  // ==========================================

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      reset({
        subject: initialValues.subject || "",
        description: initialValues.description || "",
        category: initialValues.category || "",
        priority: initialValues.priority || "",
        attachments: [],
      });
    }
  }, [mode, initialValues, reset]);

  // ==========================================
  // Submit Handler
  // ==========================================

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      {/* ========================================== */}
      {/* Subject */}
      {/* ========================================== */}

      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>

        <input
          id="subject"
          type="text"
          placeholder="Enter ticket subject"
          {...register("subject")}
        />

        {errors.subject && (
          <span className={styles.error}>{errors.subject.message}</span>
        )}
      </div>

      {/* ========================================== */}
      {/* Description */}
      {/* ========================================== */}

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          rows={6}
          placeholder="Describe your issue..."
          {...register("description")}
        />

        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      {/* ========================================== */}
      {/* Category & Priority */}
      {/* ========================================== */}

      <div className={styles.grid}>
        <Select
          label="Category"
          placeholder="Select Category"
          options={CATEGORY_OPTIONS}
          error={errors.category?.message}
          {...register("category")}
        />

        <Select
          label="Priority"
          placeholder="Select Priority"
          options={PRIORITY_OPTIONS}
          error={errors.priority?.message}
          {...register("priority")}
        />
      </div>

      {/* ========================================== */}
      {/* Attachments */}
      {/* ========================================== */}

      <div className={styles.formGroup}>
        <label>Attachments</label>

        <Controller
          name="attachments"
          control={control}
          render={({ field }) => (
            <FileUpload
              value={field.value}
              onChange={field.onChange}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              multiple
              maxFiles={5}
              maxFileSize={10 * 1024 * 1024}
              disabled={loading}
              error={errors.attachments?.message}
            />
          )}
        />
      </div>

      {/* ========================================== */}
      {/* Action Buttons */}
      {/* ========================================== */}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Ticket"
              : "Update Ticket"}
        </button>
      </div>
    </form>
  );
};

TicketForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]),
  initialValues: PropTypes.object,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default TicketForm;

import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";

import FileUpload from "../../Common/FileUpload";

import styles from "./TicketCommentForm.module.css";

const defaultValues = {
  message: "",
  attachments: [],
};

const TicketCommentForm = ({
  loading = false,
  onSubmit,
  allowInternalNote = false,
}) => {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues,
  });

  const isInternal = watch("isInternal", false);

  const submitHandler = (data) => {
    onSubmit(data);

    reset(defaultValues);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.group}>
        <label>Comment</label>

        <textarea
          rows={5}
          placeholder="Write your reply..."
          {...register("message", {
            required: true,
          })}
        />
      </div>

      {allowInternalNote && (
        <div className={styles.checkbox}>
          <input id="internal" type="checkbox" {...register("isInternal")} />

          <label htmlFor="internal">Internal Note</label>
        </div>
      )}

      <Controller
        name="attachments"
        control={control}
        render={({ field }) => (
          <FileUpload
            value={field.value}
            onChange={field.onChange}
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024}
          />
        )}
      />

      <div className={styles.actions}>
        <button type="submit" disabled={loading}>
          {loading
            ? "Posting..."
            : isInternal
              ? "Add Internal Note"
              : "Post Reply"}
        </button>
      </div>
    </form>
  );
};

TicketCommentForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  allowInternalNote: PropTypes.bool,
};

export default TicketCommentForm;

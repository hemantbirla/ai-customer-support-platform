import "./FormError.css";

const FormError = ({ message, error, className = "" }) => {
  const errorMessage = message || error;

  if (!errorMessage) return null;

  return (
    <p
      className={`form-error ${className}`.trim()}
      role="alert"
      aria-live="polite"
    >
      {errorMessage}
    </p>
  );
};

export default FormError;

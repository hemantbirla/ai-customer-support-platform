import { useEffect, useId, useRef } from "react";
import "./Modal.css";

function Modal({
  isOpen,
  title,
  children,
  onClose,
  footer,
  width = "500px",
  closeOnOverlay = true,
  closeOnEsc = true,
}) {
  const modalRef = useRef(null);
  const previousFocusedElement = useRef(null);

  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    previousFocusedElement.current = document.activeElement;

    document.body.style.overflow = "hidden";

    modalRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";

      document.removeEventListener("keydown", handleKeyDown);

      previousFocusedElement.current?.focus();
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal"
        ref={modalRef}
        style={{ maxWidth: width }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal-header">
          <h2 id={titleId}>{title}</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;

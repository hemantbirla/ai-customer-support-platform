import PropTypes from "prop-types";
import styles from "./TicketHeader.module.css";

const TicketHeader = ({
  title = "Ticket Management",
  subtitle = "Manage and track customer support tickets.",
  showCreateButton = true,
  createButtonText = "Create Ticket",
  onCreate,
}) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {showCreateButton && (
        <button
          type="button"
          className={styles.createButton}
          onClick={onCreate}
        >
          + {createButtonText}
        </button>
      )}
    </div>
  );
};

TicketHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showCreateButton: PropTypes.bool,
  createButtonText: PropTypes.string,
  onCreate: PropTypes.func,
};

export default TicketHeader;

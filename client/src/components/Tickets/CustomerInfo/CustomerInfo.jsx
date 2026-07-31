import PropTypes from "prop-types";
import { format } from "date-fns";

import styles from "./CustomerInfo.module.css";

const CustomerInfo = ({ customer }) => {
  if (!customer) return null;

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Customer Information</h3>

      <div className={styles.profile}>
        <div className={styles.avatar}>
          {customer.name ? customer.name.charAt(0).toUpperCase() : "U"}
        </div>

        <div>
          <h4 className={styles.name}>{customer.name || "-"}</h4>

          <p className={styles.email}>{customer.email || "-"}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.item}>
          <label>Phone</label>

          <p>{customer.phone || "-"}</p>
        </div>

        <div className={styles.item}>
          <label>Account Created</label>

          <p>
            {customer.createdAt
              ? format(new Date(customer.createdAt), "dd MMM yyyy")
              : "-"}
          </p>
        </div>

        <div className={styles.item}>
          <label>Customer ID</label>

          <p>{customer._id || "-"}</p>
        </div>
      </div>
    </section>
  );
};

CustomerInfo.propTypes = {
  customer: PropTypes.object,
};

export default CustomerInfo;

import "./StatCard.css";

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div className="stat-card__icon">
          <Icon />
        </div>

        <span className="stat-card__trend">{trend}</span>
      </div>

      <div className="stat-card__body">
        <h2 className="stat-card__value">{value}</h2>

        <p className="stat-card__title">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;

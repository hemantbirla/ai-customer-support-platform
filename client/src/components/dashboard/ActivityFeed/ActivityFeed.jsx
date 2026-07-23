import { activityFeed } from "../../../data/dashboardData";
import "./ActivityFeed.css";

const ActivityFeed = () => {
  return (
    <section className="activity-feed">
      <h2 className="activity-feed__title">Activity Feed</h2>

      <div className="activity-feed__timeline">
        {activityFeed.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-item__dot"></div>

            <div className="activity-item__content">
              <h3>{activity.title}</h3>

              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityFeed;

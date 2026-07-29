import { useEffect, useState } from "react";
import { getActivityLogs } from "../../../services/ticket.service";

import "./ActivityFeed.css";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      // Replace with a real endpoint when available
      // Example:
      // const res = await getDashboardActivity();

      setActivities([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="activity-feed">
      <h2 className="activity-feed__title">Activity Feed</h2>

      <div className="activity-feed__timeline">
        {activities.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="activity-item">
              <div className="activity-item__dot" />

              <div className="activity-item__content">
                <h3>{activity.title}</h3>

                <span>{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ActivityFeed;

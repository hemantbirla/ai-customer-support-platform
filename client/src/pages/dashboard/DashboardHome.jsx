import WelcomeBanner from "../../components/dashboard/WelcomeBanner/WelcomeBanner";
import StatCard from "../../components/dashboard/StatCard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions/QuickActions";
import RecentTickets from "../../components/dashboard/RecentTickets";
import ActivityFeed from "../../components/dashboard/ActivityFeed/ActivityFeed";

import { dashboardStats } from "../../data/dashboardData";

import "./DashboardHome.css";

const DashboardHome = () => {
  return (
    <main className="dashboard-home">
      {/* Welcome Section */}

      <WelcomeBanner />

      {/* Statistics */}

      <section className="dashboard-section">
        <div className="dashboard-stats">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}

      <section className="dashboard-section">
        <QuickActions />
      </section>

      {/* Tickets */}

      <section className="dashboard-section">
        <RecentTickets />
      </section>

      {/* Activity */}

      <section className="dashboard-section">
        <ActivityFeed />
      </section>
    </main>
  );
};

export default DashboardHome;

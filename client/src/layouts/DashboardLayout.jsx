import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar/Sidebar";
import Navbar from "../components/layout/Navbar/Navbar";
import Breadcrumb from "../components/layout/Breadcrumb/Breadcrumb";

import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <Breadcrumb />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

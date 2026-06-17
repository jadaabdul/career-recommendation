import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setStats(res.data);
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>{stats.totalUsers || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Courses</h5>
              <h2>{stats.totalCourses || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Jobs</h5>
              <h2>{stats.totalJobs || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Enrollments</h5>
              <h2>{stats.totalEnrollments || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4 shadow">
        <div className="card-body">
          <h4>Career Recommendation System</h4>
          <p>
            Welcome to Admin Dashboard. Here you can manage users, categories,
            courses, jobs, skills and monitor system statistics.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;

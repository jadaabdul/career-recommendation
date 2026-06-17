import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  const chartData = [
    {
      name: "Users",
      count: stats.totalUsers || 0,
    },
    {
      name: "Courses",
      count: stats.totalCourses || 0,
    },
    {
      name: "Jobs",
      count: stats.totalJobs || 0,
    },
    {
      name: "Enrollments",
      count: stats.totalEnrollments || 0,
    },
  ];

  return (
    <AdminLayout>
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h6>Total Users</h6>
              <h2>{stats.totalUsers || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h6>Total Courses</h6>
              <h2>{stats.totalCourses || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h6>Total Jobs</h6>
              <h2>{stats.totalJobs || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h6>Total Enrollments</h6>
              <h2>{stats.totalEnrollments || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 mt-4">
        <div className="card-body">
          <h5 className="mb-3">System Overview</h5>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5>Latest Users</h5>

              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.latestUsers?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5>Latest Jobs</h5>

              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.latestJobs?.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;

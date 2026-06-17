import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";

function UserJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("/jobs");

    setJobs(res.data);
  };

  return (
    <AdminLayout>
      <h2>Available Jobs</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default UserJobs;
import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";

function Recommendations() {
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const token = localStorage.getItem("token");

    const jobsRes = await api.get(
      "/recommendations/jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const coursesRes = await api.get(
      "/recommendations/courses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setJobs(jobsRes.data);
    setCourses(coursesRes.data);
  };

  return (
    <AdminLayout>
      <h2>Career Recommendations</h2>

      <div className="card p-3 mb-4">
        <h4>Recommended Jobs</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Match %</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.match_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-3">
        <h4>Recommended Courses</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Skill</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.skill_name}</td>
                <td>₹{course.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Recommendations;
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  return (
    <AdminLayout>
      <h2>User Dashboard</h2>

      <div className="card shadow mt-3">
        <div className="card-body">
          <h4>Welcome {user?.name}</h4>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-3">
          <div
            className="card shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/my-skills")}
          >
            <div className="card-body text-center">
              <h5>My Skills</h5>
              <p>Manage Your Skills</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/user-jobs")}
          >
            <div className="card-body text-center">
              <h5>Jobs</h5>
              <p>Browse Available Jobs</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/user-courses")}
          >
            <div className="card-body text-center">
              <h5>Courses</h5>
              <p>Explore Courses</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card shadow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/recommendations")}
          >
            <div className="card-body text-center">
              <h5>Recommendations</h5>
              <p>Career Suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UserDashboard;
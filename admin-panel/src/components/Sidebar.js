import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Admin Panel</h4>

      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/dashboard" className="text-white text-decoration-none">
            Dashboard
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/categories" className="text-white text-decoration-none">
            Categories
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/courses" className="text-white text-decoration-none">
            Courses
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/jobs" className="text-white text-decoration-none">
            Jobs
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/skills" className="text-white text-decoration-none">
            Skills
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/users" className="text-white text-decoration-none">
            Users
          </Link>
        </li>

        <hr />

        <li>
          <button className="btn btn-danger w-100" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

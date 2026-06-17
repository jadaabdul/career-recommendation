import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const activeStyle = {
    backgroundColor: "#0d6efd",
    padding: "10px",
    borderRadius: "8px",
    display: "block",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const normalStyle = {
    padding: "10px",
    display: "block",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
  };

  return (
    <div
      className="bg-dark text-white p-3 shadow"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4 text-center">
        {user?.role === "admin" ? "Admin Panel" : "User Panel"}
      </h4>

      <ul className="list-unstyled">
        {user?.role === "admin" && (
          <>
            <li className="mb-2">
              <NavLink
                to="/dashboard"
                style={
                  location.pathname === "/dashboard" ? activeStyle : normalStyle
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/categories"
                style={
                  location.pathname === "/categories"
                    ? activeStyle
                    : normalStyle
                }
              >
                Categories
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/courses"
                style={
                  location.pathname === "/courses" ? activeStyle : normalStyle
                }
              >
                Courses
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/jobs"
                style={
                  location.pathname === "/jobs" ? activeStyle : normalStyle
                }
              >
                Jobs
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/skills"
                style={
                  location.pathname === "/skills" ? activeStyle : normalStyle
                }
              >
                Skills
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/users"
                style={
                  location.pathname === "/users" ? activeStyle : normalStyle
                }
              >
                Users
              </NavLink>
            </li>
          </>
        )}

        {user?.role === "user" && (
          <>
            <li className="mb-2">
              <NavLink
                to="/user-dashboard"
                style={
                  location.pathname === "/user-dashboard"
                    ? activeStyle
                    : normalStyle
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/profile"
                style={
                  location.pathname === "/profile" ? activeStyle : normalStyle
                }
              >
                My Profile
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/my-skills"
                style={
                  location.pathname === "/my-skills" ? activeStyle : normalStyle
                }
              >
                My Skills
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/user-courses"
                style={
                  location.pathname === "/user-courses"
                    ? activeStyle
                    : normalStyle
                }
              >
                Courses
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/user-jobs"
                style={
                  location.pathname === "/user-jobs" ? activeStyle : normalStyle
                }
              >
                Jobs
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/recommendations"
                style={
                  location.pathname === "/recommendations"
                    ? activeStyle
                    : normalStyle
                }
              >
                Recommendations
              </NavLink>
            </li>
          </>
        )}

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

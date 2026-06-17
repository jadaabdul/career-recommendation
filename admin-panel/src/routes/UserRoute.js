import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!user || user.role !== "user") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default UserRoute;
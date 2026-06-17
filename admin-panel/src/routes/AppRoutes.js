import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Courses from "../pages/Courses";
import Jobs from "../pages/Jobs";
import Skills from "../pages/Skills";
import Users from "../pages/Users";

import ProtectedRoute from "./ProtectedRoute";

import UserDashboard from "../pages/UserDashboard";
import Profile from "../pages/Profile";
import MySkills from "../pages/MySkills";
import Recommendations from "../pages/Recommendations";
import UserCourses from "../pages/UserCourses";
import UserJobs from "../pages/UserJobs";
import NotFound from "../pages/NotFound";
import UserRoute from "./UserRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />

        <Route
          path="/my-skills"
          element={
            <UserRoute>
              <MySkills />
            </UserRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <UserRoute>
              <Recommendations />
            </UserRoute>
          }
        />

        <Route
          path="/user-courses"
          element={
            <UserRoute>
              <UserCourses />
            </UserRoute>
          }
        />

        <Route
          path="/user-jobs"
          element={
            <UserRoute>
              <UserJobs />
            </UserRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";

function UserCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/courses");

    setCourses(res.data);
  };

  return (
    <AdminLayout>
      <h2>Available Courses</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>₹{course.price}</td>
              <td>{course.category_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default UserCourses;
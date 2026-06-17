import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";

function Courses() {
  const [courses, setCourses] = useState([]);

  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category_id: "",
    instructor_id: 1,
  });

  useEffect(() => {
    fetchCourses();
  }, [search, page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get(`/courses?search=${search}&page=${page}&limit=5`);

    setCourses(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");

    setCategories(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addCourse = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await api.post("/courses", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm({
      title: "",
      description: "",
      price: "",
      thumbnail: "",
      category_id: "",
      instructor_id: 1,
    });

    fetchCourses();
  };

  const updateCourse = async () => {
    const token = localStorage.getItem("token");

    await api.put(`/courses/${editId}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEditId(null);

    setForm({
      title: "",
      description: "",
      price: "",
      thumbnail: "",
      category_id: "",
      instructor_id: 1,
    });

    fetchCourses();
  };

  const deleteCourse = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("token");

    await api.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCourses();

    Swal.fire("Deleted!", "Course deleted successfully.", "success");
  };

  return (
    <AdminLayout>
      <h2>Courses</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Course..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <form onSubmit={addCourse} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-2"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          className="form-control mb-2"
          value={form.thumbnail}
          onChange={handleChange}
        />

        <select
          name="category_id"
          className="form-control mb-2"
          value={form.category_id}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {editId ? (
          <button
            type="button"
            className="btn btn-warning"
            onClick={updateCourse}
          >
            Update Course
          </button>
        ) : (
          <button className="btn btn-primary">Add Course</button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>

            <th>Title</th>

            <th>Price</th>

            <th>Category</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>

              <td>{course.title}</td>

              <td>₹{course.price}</td>

              <td>{course.category_name}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(course.id);

                    setForm({
                      title: course.title,
                      description: course.description,
                      price: course.price,
                      thumbnail: course.thumbnail,
                      category_id: course.category_id,
                      instructor_id: course.instructor_id,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </AdminLayout>
  );
}

export default Courses;

import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");

    setCategories(res.data);
  };

  const addCategory = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/categories",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setName("");

      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const updateCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/categories/${editId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditId(null);

      setName("");

      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("token");

    await api.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCategories();

    Swal.fire("Deleted!", "Category deleted successfully.", "success");
  };

  return (
    <AdminLayout>
      <h2>Categories</h2>

      <form onSubmit={addCategory} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            {editId ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={updateCategory}
              >
                Update Category
              </button>
            ) : (
              <button className="btn btn-primary">Add Category</button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>

            <th>Name</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(item.id);
                    setName(item.name);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCategory(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default Categories;

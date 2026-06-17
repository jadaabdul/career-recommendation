import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/users", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "user",
      });

      fetchUsers();

      toast.success("User Added Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Add User");
    }
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/users/${editId}`,
        {
          name: form.name,
          mobile: form.mobile,
          role: form.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditId(null);

      setForm({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "user",
      });

      fetchUsers();

      toast.success("User Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Update User");
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();

      Swal.fire("Deleted!", "User deleted successfully.", "success");
    } catch (error) {
      toast.error("Failed To Delete User");
    }
  };

  return (
    <AdminLayout>
      <h2>Users</h2>

      <div className="card p-3 mb-4">
        <h5>{editId ? "Edit User" : "Add User"}</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {!editId && (
          <>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </>
        )}

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) =>
            setForm({
              ...form,
              mobile: e.target.value,
            })
          }
        />

        <select
          className="form-control mb-2"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {editId ? (
          <button className="btn btn-warning" onClick={updateUser}>
            Update User
          </button>
        ) : (
          <button className="btn btn-primary" onClick={addUser}>
            Add User
          </button>
        )}
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.mobile}</td>

              <td>{user.role}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(user.id);

                    setForm({
                      name: user.name,
                      email: user.email,
                      password: "",
                      mobile: user.mobile,
                      role: user.role,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user.id)}
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

export default Users;

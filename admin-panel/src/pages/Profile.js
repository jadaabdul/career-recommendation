import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm(res.data);
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put("/users/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Failed To Update Profile");
    }
  };

  return (
    <AdminLayout>
      <h2>My Profile</h2>

      <div className="card p-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={form.name || ""}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          className="form-control mb-3"
          value={form.email || ""}
          disabled
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Mobile"
          value={form.mobile || ""}
          onChange={(e) =>
            setForm({
              ...form,
              mobile: e.target.value,
            })
          }
        />

        <button className="btn btn-primary" onClick={updateProfile}>
          Update Profile
        </button>
      </div>
    </AdminLayout>
  );
}

export default Profile;

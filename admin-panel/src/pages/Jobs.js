import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
  }, [search, page]);

  const fetchJobs = async () => {
    const res = await api.get(`/jobs?search=${search}&page=${page}&limit=5`);

    setJobs(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addJob = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await api.post("/jobs", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });

    fetchJobs();
  };

  const updateJob = async () => {
    const token = localStorage.getItem("token");

    await api.put(`/jobs/${editId}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEditId(null);

    setForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });

    fetchJobs();
  };

  const deleteJob = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This job will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("token");

    await api.delete(`/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchJobs();

    Swal.fire("Deleted!", "Job deleted successfully.", "success");
  };

  return (
    <AdminLayout>
      <h2>Jobs</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Job..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <form onSubmit={addJob} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          className="form-control mb-2"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="form-control mb-2"
          value={form.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="form-control mb-2"
          value={form.salary}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={form.description}
          onChange={handleChange}
        />

        {editId ? (
          <button type="button" className="btn btn-warning" onClick={updateJob}>
            Update Job
          </button>
        ) : (
          <button className="btn btn-primary">Add Job</button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>

              <td>{job.title}</td>

              <td>{job.company}</td>

              <td>{job.location}</td>

              <td>{job.salary}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(job.id);

                    setForm({
                      title: job.title,
                      company: job.company,
                      location: job.location,
                      salary: job.salary,
                      description: job.description,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteJob(job.id)}
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

export default Jobs;

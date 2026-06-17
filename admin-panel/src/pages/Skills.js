import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await api.get("/skills");
    setSkills(res.data);
  };

  const addSkill = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/skills",
        {
          skill_name: skillName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSkillName("");

      fetchSkills();

      toast.success("Skill Added Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Add Skill");
    }
  };

  const editSkill = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/skills/${editId}`,
        {
          skill_name: skillName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSkillName("");

      setEditId(null);

      fetchSkills();

      toast.success("Skill Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Update Skill");
    }
  };

  const deleteSkill = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This skill will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchSkills();

      Swal.fire("Deleted!", "Skill deleted successfully.", "success");
    } catch (error) {
      toast.error("Failed To Delete Skill");
    }
  };

  return (
    <AdminLayout>
      <h2>Skills</h2>

      <form onSubmit={addSkill} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Skill Name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            {editId ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={editSkill}
              >
                Update Skill
              </button>
            ) : (
              <button className="btn btn-primary">Add Skill</button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Skill Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.id}</td>

              <td>{skill.skill_name}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(skill.id);
                    setSkillName(skill.skill_name);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSkill(skill.id)}
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

export default Skills;

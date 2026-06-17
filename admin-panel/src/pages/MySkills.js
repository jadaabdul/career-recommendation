import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function MySkills() {
  const [skills, setSkills] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [skillId, setSkillId] = useState("");

  useEffect(() => {
    fetchSkills();
    fetchMySkills();
  }, []);

  const fetchSkills = async () => {
    const res = await api.get("/skills");
    setSkills(res.data);
  };

  const fetchMySkills = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/skills/my-skills", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMySkills(res.data);
  };

  const addSkill = async () => {
    if (!skillId) {
      toast.warning("Please Select A Skill");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/skills/user-skill",
        {
          skill_id: skillId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSkillId("");

      fetchMySkills();

      toast.success("Skill Added Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Add Skill");
    }
  };

  const removeSkill = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This skill will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Remove",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/skills/my-skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMySkills();

      Swal.fire("Removed!", "Skill removed successfully.", "success");
    } catch (error) {
      toast.error("Failed To Remove Skill");
    }
  };

  return (
    <AdminLayout>
      <h2>My Skills</h2>

      <div className="card p-3 mb-4">
        <h5>Add Skill</h5>

        <select
          className="form-control mb-3"
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
        >
          <option value="">Select Skill</option>

          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.skill_name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={addSkill}>
          Add Skill
        </button>
      </div>

      <div className="card p-3">
        <h5>My Skills</h5>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Skill</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {mySkills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.id}</td>

                <td>{skill.skill_name}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeSkill(skill.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default MySkills;

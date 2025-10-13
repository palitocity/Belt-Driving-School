"use client";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Trash2, Edit, Upload } from "lucide-react";
import Image from "next/image";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";

const API_BASE = "https://api.beltdrivingschool.com/api/admin/dashboard/team";

interface Team {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", bio: "" });
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🧩 Fetch all team members
  const getAllTeam = async () => {
    try {
      const res = await axios.get(
        `https://api.beltdrivingschool.com/api/auth/team/all`
      );
      setTeams(res.data);
      console.log(teams);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🧩 Open modal (new/edit)
  const openModal = (team?: Team) => {
    if (team) {
      setEditId(team._id || null);
      setForm({
        name: team.name,
        role: team.role,
        bio: team.bio,
      });
      setUploadedUrl(team.image);
    } else {
      setEditId(null);
      setForm({ name: "", role: "", bio: "" });
      setUploadedUrl(null);
    }
    setModalOpen(true);
  };

  // 🧩 Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧩 Convert image to base64 and upload to backend
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result as string;

      try {
        setUploading(true);
        toast.loading("Uploading image...");

        const res = await axios.post(
          `${API_BASE}/upload`,
          { image: base64String },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const imageUrl = `https://belt-driving-school-backend-3.onrender.com${res.data.path}`;
        setUploadedUrl(imageUrl);
        console.log(imageUrl);

        toast.dismiss();
        toast.success("Image uploaded successfully!");
      } catch (error) {
        if (isAxiosError(error)) {
          const apiMessage = error.response?.data?.message;
          const apiError = error.response?.data?.error;
          const fallback = error.message || "An unexpected error occurred";

          const errorMsg =
            `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
            fallback;

          toast.error(errorMsg);
        }
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read image file!");
    };
  };

  // 🧩 Submit only text + uploaded image URL
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uploadedUrl) {
      toast.error("Please upload an image first!");
      return;
    }

    try {
      setLoading(true);
      toast.loading(editId ? "Updating..." : "Adding...");

      const payload = {
        name: form.name,
        role: form.role,
        bio: form.bio,
        image: uploadedUrl,
      };

      if (editId) {
        await axios.put(
          `https://api.beltdrivingschool.com/api/admin/dashboard/team/update/${editId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Team member updated!");
      } else {
        await axios.post(
          `https://api.beltdrivingschool.com/api/admin/dashboard/team/add`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Team member added!");
      }

      // Reset
      setForm({ name: "", role: "", bio: "" });
      setUploadedUrl(null);
      setEditId(null);
      setModalOpen(false);
      getAllTeam();
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong!";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  // 🧩 Delete member
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Member deleted!");
      getAllTeam();
    } catch {
      toast.error("Failed to delete!");
    }
  };

  return (
    <Adminlayouts>
      <Head>
        <title>Team Management - Admin Dashboard</title>
      </Head>
      <div className="p-5">
        <Toaster position="top-right" />
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-[#0A2E57]">Team Management</h1>
          <button
            onClick={() => openModal()}
            className="bg-[#0A2E57] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Add Team
          </button>
        </div>

        {/* TEAM CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
              >
                <Image
                  src={team.image || "/placeholder.jpg"}
                  alt={team.name}
                  className="rounded-full object-cover mb-3"
                  width={80}
                  height={80}
                />
                <h2 className="text-lg font-semibold text-[#0A2E57]">
                  {team.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{team.role}</p>
                <p className="text-center text-gray-500 text-sm">{team.bio}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => openModal(team)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(team._id!)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              No team members yet.
            </p>
          )}
        </div>

        {/* MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-[90%] sm:w-[450px] p-6 shadow-lg relative">
              <h2 className="text-xl font-semibold text-[#0A2E57] mb-4">
                {editId ? "Edit Team Member" : "Add New Team Member"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                />

                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                />

                <textarea
                  name="bio"
                  placeholder="Short Bio"
                  value={form.bio}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none h-24"
                ></textarea>

                <div className="border border-gray-300 rounded-lg p-3">
                  <label className="flex items-center gap-2 text-[#0A2E57] font-medium cursor-pointer">
                    <Upload size={18} />
                    <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                  </label>
                  {uploadedUrl && (
                    <Image
                      src={uploadedUrl}
                      alt="Preview"
                      className=" rounded-full object-cover mt-3"
                      width={80}
                      height={80}
                    />
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="border border-gray-400 px-4 py-2 rounded-lg text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0A2E57] text-white px-4 py-2 rounded-lg"
                  >
                    {loading ? "Saving..." : editId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Adminlayouts>
  );
};

export default TeamPage;

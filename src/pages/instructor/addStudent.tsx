import React, { useState } from "react";
import Instructorlayouts from "../layouts/Instructorlayout";
import Head from "next/head";
import axios, { isAxiosError } from "axios";
import { UserPlus, Loader2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const AddStudent = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      const instructorId = localStorage.getItem("user");
      const id = instructorId ? JSON.parse(instructorId).id : null;
      console.log(id);

      if (!token) {
        setMessage({
          type: "error",
          text: "Unauthorized. Please log in again.",
        });
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/instructor/dashboard/assign-student",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setMessage({
          type: "success",
          text: `✅ Student (${email}) successfully assigned to you!`,
        });
        setEmail("");
      }
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
      setLoading(false);
    }
  };

  return (
    <Instructorlayouts>
      <Head>
        <title>Assign Student | Instructor Panel</title>
      </Head>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-lg mx-auto mt-10">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Assign Student
          </h2>
        </div>

        {message && (
          <div
            className={`flex items-center gap-2 p-3 mb-4 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Student Email
            </label>
            <input
              type="email"
              placeholder="Enter student's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-900 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-all disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Assigning...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Assign Student
              </>
            )}
          </button>
        </form>
      </div>
    </Instructorlayouts>
  );
};

export default AddStudent;

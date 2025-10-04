import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";

interface StudentType {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  isVerified?: boolean;
}

const Student = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllStudents = async () => {
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/admin/dashboard/students",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudents(response.data);
      console.log("Students data:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <Adminlayouts>
      <Head>
        <title>Students | Belt Driving School</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#0A2E57] mb-6">Students</h1>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading students...
            </div>
          ) : students.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No students found.
            </div>
          ) : (
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-[#0A2E57] text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 whitespace-nowrap">Full Name</th>
                  <th className="px-6 py-3 whitespace-nowrap">Email</th>
                  <th className="px-6 py-3 whitespace-nowrap">Phone</th>
                  <th className="px-6 py-3 whitespace-nowrap">Role</th>
                  <th className="px-6 py-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student: StudentType, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {student.fullName || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.email || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {student.role || "user"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          student.isVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Student;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Instructorlayouts from "../layouts/Instructorlayout";
import Head from "next/head";
import { Users, Loader2, AlertCircle } from "lucide-react";

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  studentDetails?: {
    courseLevel?: string;
    progress?: number;
    enrollmentDate?: string;
  };
}

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      // Replace this with instructor id from context, token, or state
      const instructorId = localStorage.getItem("instructorId");

      const response = await axios.get(
        `https://belt-driving-school.vercel.app/api/instructor/dashboard/${instructorId}/students`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStudents(response.data.students || []);
    } catch (err: any) {
      console.error("Error fetching students:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch students. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Instructorlayouts>
      <Head>
        <title>My Students | Instructor Dashboard</title>
      </Head>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Assigned Students
            </h2>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10 text-gray-600 dark:text-gray-300">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading students...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* No Students */}
        {!loading && students.length === 0 && !error && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No students have been assigned yet.
          </div>
        )}

        {/* Students Table */}
        {!loading && students.length > 0 && (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Course Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Progress</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Enrollment Date</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {student.email}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {student.phone || "—"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {student.studentDetails?.courseLevel || "—"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {student.studentDetails?.progress
                        ? `${student.studentDetails.progress}%`
                        : "0%"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {student.studentDetails?.enrollmentDate
                        ? new Date(
                            student.studentDetails.enrollmentDate
                          ).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Instructorlayouts>
  );
};

export default StudentsList;

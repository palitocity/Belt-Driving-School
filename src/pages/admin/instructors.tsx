import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";

interface InstructorType {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
}

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  const [loading, setLoading] = useState(true);

  const getAllInstructors = async () => {
    try {
      const response = await axios.get(
        "http://api.beltdrivingschool.com/api/admin/dashboard/instructors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInstructors(response.data);
      console.log("Students data:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  return (
    <Adminlayouts>
      <Head>
        <title>Instructors | Belt Driving School</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#0A2E57] mb-6">Instructors</h1>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading instructors...
            </div>
          ) : instructors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No instructors found.
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
                {instructors.map(
                  (instructor: InstructorType, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {instructor.fullName || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {instructor.email || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {instructor.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {instructor.role || "user"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            instructor.isVerified
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {instructor.isVerified ? "Verified" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Instructors;

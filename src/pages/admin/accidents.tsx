/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import Head from "next/head";
import Adminlayouts from "../layouts/Adminlayouts";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

const Accidents = () => {
  const [accidents, setAccidents] = useState<any[]>([]);

  const getAllAccidents = async () => {
    try {
      const response = await axios.get(
        "https://api.beltdrivingschool.com/api/admin/accidents",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAccidents(response.data || []);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching accidents"
        );
      }
    }
  };

  useEffect(() => {
    getAllAccidents();
  }, []);

  return (
    <Adminlayouts>
      <Head>
        <title>Accidents | Belt Driving School</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#0A2E57] mb-6">
          Reported Accidents
        </h1>

        {/* Table container with scroll on mobile */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full table-auto text-left text-gray-700">
            <thead className="bg-[#0A2E57] text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">Student</th>
                <th className="px-6 py-3 whitespace-nowrap">Instructor</th>
                <th className="px-6 py-3 whitespace-nowrap">Date</th>
                <th className="px-6 py-3 whitespace-nowrap">Location</th>
                <th className="px-6 py-3 whitespace-nowrap">Description</th>
                <th className="px-6 py-3 whitespace-nowrap">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {accidents.map((accident) => (
                <tr
                  key={accident.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {accident.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {accident.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {accident.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {accident.location}
                  </td>
                  <td className="px-6 py-4 min-w-[250px]">
                    {accident.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        accident.severity === "Minor"
                          ? "bg-green-100 text-green-700"
                          : accident.severity === "Moderate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {accident.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Accidents;
